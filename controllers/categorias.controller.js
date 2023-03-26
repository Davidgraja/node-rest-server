const { request, response } = require("express");

const {Categorias} = require('../models');

const populateFields = {
    nombre : 1 ,
    correo : 1 ,
    rol : 1 ,
    uid : 1
}


const getCategories = async (req = request, res = response ) => {

    const query = { estado : true }

    const {limit= 0 , skip = 0  } = req.query;

    const [total , allCategories] = await Promise.all([
        Categorias.countDocuments( query ),

        Categorias.find( query )
            .skip( Number(skip) )
            .limit( Number(limit) )
            .populate('usuario', populateFields )
    ])

    res.json({
        total,
        allCategories
    })

}


const getCategory = async ( req = request , res = response ) => {

    const { id } = req.params;

    const category =  await Categorias.findById(id).populate('usuario' , populateFields);

    res.json(category)
    
}


const createCategory = async ( req = request , res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categorias.findOne({nombre});

    if( categoriaDb ) {
        return res.status(409).json({
            message : `La categoria ${ categoriaDb.nombre } , ya ha sido creada`
        })
    }

    //? generación de la data para guardar

    const data = {
        nombre,
        usuario : req.authenticatedUser._id
    }

    const categoria =  new Categorias( data  );
    
    //? guardar en base de datos  
    await categoria.save();


    res.status(201).json( categoria );
}


const updateCategory = async (req = request , res = response) => {

    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const validateNombre = await Categorias.findOne({nombre});

    if(validateNombre){
        return  res.status(400).json({
            message : `Ya existe una categoria con el nombre de: ${ nombre }`
        })
    }

    const category = await Categorias.findByIdAndUpdate( id ,  { nombre }, { new : true} )

    res.json({
        message : 'Categoria actualizada',
        category
    })


}


const deleteCategory = async (req = request , res = response) => {
    
    const { id } = req.params;

    const validateActiveCategory  = await Categorias.findById(id);
    
    if(!validateActiveCategory.estado){
        return res.status(400).json({
            message : 'El usuario ya se ha eliminado anteriormente' 
        })
    }

    await Categorias.findByIdAndUpdate(id , { estado : false } , {new : true })

    res.json({
        message : 'usuario eliminado'
    })
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}