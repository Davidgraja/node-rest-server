const {Router} =  require('express');
const { searchProductsByCategory } = require('../controllers/productsByCategory.controller');
const { check } = require('express-validator');
const { validateExistCategoryById } = require('../helpers/db_validations');
const { validarCampos } = require('../middlewares');

const router  = Router();


router.get('/:category', [

    // check('category' , 'el id enviado no es valido').isMongoId(),
    // check('category').custom( validateExistCategoryById ),
    // validarCampos
] , searchProductsByCategory)

module.exports = router;