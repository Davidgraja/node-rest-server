const dbValidations   = require('./db_validations');
const generarJwt      = require('./generar_jwt');
const googleVerify    = require('./google-verify');
const isValidObjectId = require('./isValidObjectId');
const uploadFile      = require('./uploadFile');

module.exports ={
    ...dbValidations ,
    ...generarJwt ,
    ...googleVerify ,
    ...isValidObjectId,
    ...uploadFile,
}