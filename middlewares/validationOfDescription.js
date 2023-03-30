const { request, response } = require("express");

const validationOfDescrition = (req = request , res = response  , next ) => {

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

module.exports = validationOfDescrition;