const { request, response } = require("express");
const { Producto } = require('../models');

const getAllProducts =  async ( req = request , res = response ) => {

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


const getProductById = async ( req = request , res = response ) =>{

    const { id } = req.params;

    const product = await Producto.findById(id).populate('usuario categoria', 'nombre');

    res.json(product)

}


const createAProduct = async (req = request , res = response ) => {

    const {nombre , precio , categoria , descripcion} = req.body;

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


const updateProduct =  async ( req = request , res = response ) => {
    const { id } = req.params;
    const { nombre , precio , categoria , descripcion } = req.body


    const data = {
        nombre ,
        precio,
        usuario : req.authenticatedUser._id,
        categoria,
        descripcion
    }

    const updatedProduct = await Producto.findByIdAndUpdate(id , data , { new : true })

    res.json({
        message : 'Producto actualizado',
        updatedProduct
    })
}


const deleteProduct = async ( req = request , res = response ) => {
    const { id } = req.params;

    const validateActiveProduct  = await Producto.findById(id);
    
    if(!validateActiveProduct.estado){
        return res.status(400).json({
            message : 'El usuario ya se ha eliminado anteriormente' 
        })
    }

    await Producto.findByIdAndUpdate(id , { estado : false } , {new : true })

    res.json({
        message : 'usuario eliminado'
    })
}

module.exports = {
    createAProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}