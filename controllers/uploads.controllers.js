const path = require('path');
const fs = require('fs');


const { request, response } = require("express");
const { helpUploadFile } = require("../helpers");
const { Usuario , Producto } = require('../models');


const fileUpload = async ( req = request , res = response ) => {

    try {
        
        //? images
        const nameFile = await helpUploadFile(req.files , undefined , 'images');

        //? txt , md
        // const nameFile = await helpUploadFile(req.files , ['txt' , 'md'] , 'texts');
    
        res.json({ nameFile });
        
    } catch (message) {

        res.status(400).json({ message });

    }

}


const updateImage = async ( req = request , res = response ) => {

    const {collection , id} = req.params;

    let modelo ;

    switch (collection) {
        case 'usuarios':
        
            modelo = await Usuario.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    message : `No existe un usuario con el id : ${ id }` 
                })
            }

        break;

        case 'productos':
        
            modelo = await Producto.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    message : `No existe un producto con el id : ${ id }` 
                })
            }

        break;
    
        default:
            res.status(500).json({ message : 'Aun no se ha implementado esa accion en el servidor' })
    }

    // Limpiar imagenes previas
    if(  modelo.img ){

        //hay que borrar la imagen del servidor
        const pathName =  path.join( __dirname , '../uploads' , collection , modelo.img );

        if(fs.existsSync(pathName)){
            fs.unlinkSync(pathName);
        }

    }

    const nameFile = await helpUploadFile(req.files , undefined , collection);
    modelo.img = nameFile

    await modelo.save();

    res.json({
        modelo
    })
}


const showImage = async ( req = request , res = response ) => {

    const {collection , id} = req.params;

    let modelo ;
    let  pathName;

    switch (collection) {
        case 'usuarios':
        
            modelo = await Usuario.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    message : `No existe un usuario con el id : ${ id }` 
                })
            }

        break;

        case 'productos':
        
            modelo = await Producto.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    message : `No existe un producto con el id : ${ id }` 
                })
            }

        break;
    
        default:
            res.status(500).json({ message : 'Aun no se ha implementado esa accion en el servidor' })
    }


    if(  modelo.img ){

        pathName =  path.join( __dirname , '../uploads' , collection , modelo.img );

        if(fs.existsSync(pathName)){
            return res.sendFile( pathName )
        }

    }

    pathName =  path.join( __dirname , '../assets' , 'no-image.jpg' );

    res.sendFile(pathName)

}


module.exports = {
    fileUpload ,
    updateImage,
    showImage
}