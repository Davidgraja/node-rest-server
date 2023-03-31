
const { request, response } = require("express");
const isValidObjectId = require("../helpers/isValidObjectId");
const { Categorias } = require("../models");
const { Producto } = require("../models");

const validationOfDescrition = ( req = request , res = response , next ) => {

    const {descripcion} = req.body;

    if(descripcion){

        if( typeof(descripcion) !== 'string' || !isNaN(descripcion) ){
            return res.status(400).json({
                message : 'La descripcion no es aceptable , solo se aceptan cadenas de texto '
            })
        }

    }

    next()
}


const validationOfPrice = ( req = request , res = response , next) => {

    const { precio  }  = req.body

    try {
        
        if(precio){
        
            if(isNaN(precio)){
                return res.status(400).json({
                    message : 'El precio no es valido , intente llenando el campo y con valores numericos'
                })
            }
    
        }
        
        else if( precio.length== 0 ){
            return res.status(400).json({
                message : 'Es necesario enviar un valor'
            })
        }
        
        next();

    } catch {
        
        next();
    }

}

const validationOfName = async ( req = request , res = response , next ) => {

    const { nombre } = req.body;

    try {
        
    
        if( nombre.length === 0 || !isNaN(nombre) ){
            return res.status(400).json({
                message : 'El nombre no es valido , intente con otro nombre'
            })
        }

        const validateProduct = await Producto.findOne({nombre});
        
        if(validateProduct){
            return res.status(400).json({
                message : `El nombre : ${ nombre } ya se encuentra en uso , intente con otro nombre`
            })
        }

        next()
        
    } catch {
        next()
    }

}

const validationofCategoryId = async ( req = request , res = response , next ) => {

    const { categoria } = req.body;

    if(categoria){

        const prueba = isValidObjectId(categoria);

        if(!prueba){
            return res.status(400).json({
                message : `El id : ${categoria} no es valido` 
            })
        }

        if(prueba){

            const validationOfCategory = await Categorias.findById(categoria) 

            if(!validationOfCategory){
                return res.status(400).json({
                    message : `El id : ${categoria} no se ha encontrado en nuestra base de datos` 
                })
            }

        }

    }

    next()
}

module.exports = {
    validationOfDescrition,
    validationOfPrice,
    validationOfName,
    validationofCategoryId
}