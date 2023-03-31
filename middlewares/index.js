const validarJwt = require('../middlewares/validar-jwt');
const validarCampos  = require('../middlewares/validarCampos');
const validarRoles = require('../middlewares/validate-roles');
const productValidation = require('../middlewares/product-validation');

module.exports = {
    ...validarJwt,
    ...validarCampos,
    ...validarRoles,
    ...productValidation
}