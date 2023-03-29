const { request, response } = require("express");
const { Producto } = require('../models');

const getAllProducts =  async (req = request , res = response) => {
    const query = { estado : true };
    const {limit= 0 , skip = 0  } = req.query;

    const [total , allProducts] = await Promise.all([
        Producto.countDocuments( query ),

        Producto.find( query )
            .skip( Number(skip) )
            .limit( Number(limit) )
            .populate('usuario categoria', 'nombre' )
    ])

    res.json({
        total,
        allProducts
    })

}


const createAProduct = async (req = request , res = response ) => {

    const {nombre , precio , categoria , descripcion} = req.body;

    if(descripcion){

        if( typeof(descripcion) !== 'string' || !isNaN(descripcion) ){
            return res.status(400).json({
                message : 'La descripcion no es aceptable , solo se aceptan cadenas de texto '
            })
        }

    }

    const data = {
        nombre ,
        usuario : req.authenticatedUser._id ,
        precio ,
        categoria ,
        descripcion
    } 


    const product = new Producto(data);

    await product.save();

    res.json({
        message : 'producto creado',
        product
    });

}


module.exports = {
    createAProduct,
    getAllProducts
}