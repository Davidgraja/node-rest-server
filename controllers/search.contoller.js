const { request, response } = require("express");
const isValidObjectId = require("../helpers/isValidObjectId");
const { Usuario , Producto , Categorias} = require("../models");


const collectionsAllowed = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]


const searchUsers =  async ( term = '' , res = response ) => {

    const isMongoId = isValidObjectId(term);

    if( isMongoId ){
        
        const usuario = await Usuario.findById(term);

        return res.json({
            results : ( usuario ) ? [ usuario ] : []
        });

    }

    //? creacion de una expreción regular para manejar el termino con sencibilidad   
    const regex = new RegExp( term , 'i' );

    //? haciendo uso del opeador or  y and de mongo
    const usuarios = await Usuario.find({       
        $or: [ { nombre : regex}  , { correo : regex}],
        $and : [ { estado : true }]
    });
        
    res.json({
        total : usuarios.length,
        results : usuarios
    });

}

const searchCategories =  async ( term = '' , res = response ) => {

    const isMongoId = isValidObjectId(term);

    if( isMongoId ){
        
        const category = await Categorias.findById(term).populate('usuario' , 'nombre');

        return res.json({
            result : ( category ) ? [ category ] : []
        });

    }

    const regex = new RegExp( term , 'i' );

    const categories = await Categorias.find({ nombre : regex , estado : true }).populate('usuario' , 'nombre');
        
    res.json({
        total : categories.length,
        results : categories
    });

}

const searchProducts =  async ( term = '' , res = response ) => {

    const isMongoId = isValidObjectId(term);

    if( isMongoId ){
        
        const product = await Producto.findById(term).populate('usuario categoria' , 'nombre');

        return res.json({
            result : ( product ) ? [ product ] : []
        });

    }

    const regex = new RegExp( term , 'i' );

    const products = await Producto.find({ nombre : regex , estado : true  }).populate('usuario categoria' , 'nombre');
        
    res.json({
        total : products.length,
        results : products
    });

}


const search = ( req = request , res = response ) => {

    const { collection , term } = req.params;

    if( !collectionsAllowed.includes(collection) ) {
        return res.status(400).json({
            message : `La coleccion ${ collection } no es permitida , Intenta con las siguientes coleciones : ${ collectionsAllowed.join(' - ') }` 
        })
    }

    switch ( collection ) {

        case  'usuarios' :
            searchUsers( term  , res );
        break;

        case  'categorias' :
            searchCategories( term , res );
        break;
        
        case  'productos' :
            searchProducts( term , res );
        break;

        default :
            res.status(500).json({
                message : 'aun no se ha implementado esa busqueda , por favor comunicarse con el equipo de backend'
            })

    }

}

module.exports = {
    search
}