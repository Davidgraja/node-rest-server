const validarJwt = require('../middlewares/validar-jwt');
const validarCampos  = require('./validarCampos');
const validarRoles = require('../middlewares/validate-roles');
const productValidation = require('../middlewares/product-validation');
const validateFiles = require('./validateFiles');

module.exports = {
    ...validarJwt,
    ...validarCampos,
    ...validarRoles,
    ...productValidation,
    ...validateFiles
}