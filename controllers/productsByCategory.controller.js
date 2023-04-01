const { request, response } = require("express");
const { Producto, Categorias } = require('../models');
const isValidObjectId = require("../helpers/isValidObjectId");

const searchProductsByCategory = async ( req = request , res = response ) => {

    const { category } = req.params;
    
    const isMongoId = isValidObjectId(category);

    if( isMongoId ){
        
        const products = await Producto.find({ categoria :  category  , estado : true}) 
            .populate('usuario' , 'nombre')
            .populate('categoria' , 'nombre')
    
        return res.json({
            total : products.length,
            results : products
        });

    }

    const regex = new RegExp( category , 'i' );

    const categorias = await Categorias.find({nombre : regex , estado : true})

    const idOfTheCategories = categorias.map(c => { return {categoria : c._id} })
    
    const products = await Producto.find({
        $or : [ ...idOfTheCategories ],
        $and : [ { estado : true} ]
    })
    .populate('usuario' , 'nombre')
    .populate('categoria' , 'nombre')

    res.json({
        total: products.length,
        results : products

    })


}

module.exports = {
    searchProductsByCategory
}