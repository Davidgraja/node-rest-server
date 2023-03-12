const validarJwt = require('../middlewares/validar-jwt');
const validarCampos  = require('../middlewares/validarCampos');
const validarRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validarJwt,
    ...validarCampos,
    ...validarRoles
}