const Role = require('../models/role');
const Usuario = require('../models/usuario');

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

module.exports = {
    roleValidate,
    validateExistingEmail,
    validateExistingIdUser
}