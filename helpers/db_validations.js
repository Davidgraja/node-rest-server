const {Role , Usuario , Categorias , Producto} = require('../models')

const roleValidate =  async ( rol = '' ) => {
        
    const validateRol = await Role.findOne({rol});

    if(!validateRol){
        throw new Error(`El rol : ${ rol } no es permitido`)
    }

}

const validateExistingEmail =  async ( correo = '' ) => {

    const validateEmail = await  Usuario.findOne({correo});

    if(validateEmail){
        throw new Error(`El correo ${ correo } ya existe en nuestra base de datos , por favor intente con otro correo`);
    }
}

const validateExistingIdUser =  async ( id ) => {

    const validateId = await  Usuario.findById(id);

    if(!validateId){
        throw new Error(`El id: ${ id } no existe en nuestra base de datos`);
    }
}

const validateExistCategoryById = async (id) => {

    const validateCategory = await Categorias.findById(id);

    if( !validateCategory ) {
        throw new Error(`El id: ${ id } no existe en nuestra base de datos`)
    } 

}

const validateExistProduct = async (nombre = '') => {

    const validateProduct = await Producto.findOne({nombre});

    if( validateProduct ) {
        throw new Error(`El producto : ${ nombre } ya existe en nuestra base de datos , intente con otro nombre`); 
    } 

}


module.exports = {
    roleValidate,
    validateExistingEmail,
    validateExistingIdUser,
    validateExistCategoryById,
    validateExistProduct
}