const validarJwt = require('../middlewares/validar-jwt');
const validarCampos  = require('../middlewares/validarCampos');
const validarRoles = require('../middlewares/validate-roles');
const validationOfDescription = require('../middlewares/validationOfDescription');

module.exports = {
    ...validarJwt,
    ...validarCampos,
    ...validarRoles,
    ...validationOfDescription
}