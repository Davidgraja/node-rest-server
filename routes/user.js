const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT , validarCampos  , isAdminRole , hasRole } =  require('../middlewares');

const {usuariosGet , usuariosPut , usuariosPost , usuariosDelete, usuariosPatch} = require("../controllers/user.controller");
const { roleValidate, validateExistingEmail, validateExistingIdUser } = require('../helpers/db_validations');

const router = Router();

router.get('/' ,  usuariosGet  );


router.put('/:id' ,[

    check('id' , 'el id enviado no es valido').isMongoId(),
    check('id').custom( validateExistingIdUser ),
    check('correo' , 'el correo no es valido').isEmail(),
    check('password' , 'el password debe de ser mayor de 6 digitos').isLength({min:6}),   
    check('rol').custom( roleValidate ),
    validarCampos

], usuariosPut  );


router.post('/' ,[

    check('correo' , 'el correo no es valido').isEmail(),
    check('nombre' , 'el nombre es obligatorio y con un minimo de 4 digitos').notEmpty().isLength({min:4}),
    check('password' , 'el password debe de ser mayor de 6 digitos').isLength({min:6}),    
    check('correo').custom( validateExistingEmail ),
    check('rol').custom( roleValidate ),
    validarCampos

] , usuariosPost  );


router.delete('/:id', [

    validarJWT,
    isAdminRole,
    hasRole('ADMIN_ROLE' , 'VENTAS_ROLE'),
    check('id' , 'el id enviado no es valido').isMongoId(),
    check('id').custom( validateExistingIdUser ),
    validarCampos
    
], usuariosDelete  );

router.patch('/' , usuariosPatch );

module.exports = router;