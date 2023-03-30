const { Router } = require('express');
const { check } = require('express-validator');
const { createAProduct, getAllProducts , getProductById, updateProduct, deleteProduct } = require('../controllers/producto.controller');
const { validateExistCategoryById, validateExistProduct , validateExistProductById} = require('../helpers/db_validations');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const validationOfDescrition = require('../middlewares/validationOfDescription');

const router = Router();

router.get('/' , getAllProducts)

router.get('/:id', [

    check('id', 'el id no es valido').isMongoId(),
    check('id',).custom( validateExistProductById ),
    validarCampos

] , getProductById );


router.post('/', [ 

    validarJWT,
    check('nombre' , 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom( validateExistProduct ),
    check('precio' , 'El precio es obligatorio y de tipo numerico').isNumeric().notEmpty(),
    check('categoria' , 'El Id  de la categoria no es valido').isMongoId(),
    check('categoria').custom( validateExistCategoryById ), 
    validationOfDescrition,
    validarCampos

] , createAProduct );



router.put('/:id' , [ 
    validarJWT,
    check('nombre' , 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom( validateExistProduct ),
    check('precio' , 'El precio es obligatorio y de tipo numerico').isNumeric().notEmpty(),
    check('categoria' , 'El Id  de la categoria no es valido').isMongoId(),
    check('categoria').custom( validateExistCategoryById ),
    check('id', 'el id no es valido').isMongoId(),
    check('id',).custom( validateExistProductById ),
    validationOfDescrition,
    validarCampos

] , updateProduct )

router.delete('/:id' , [
    
    check('id', 'el id no es valido').isMongoId(),
    check('id',).custom( validateExistProductById ),
    validarCampos

] , deleteProduct)



module.exports = router;