const { Router } = require('express');
const { check } = require('express-validator');
const { createAProduct, getAllProducts , getProductById, updateProduct, deleteProduct } = require('../controllers/producto.controller');
const { validateExistCategoryById, validateExistProduct , validateExistProductById} = require('../helpers/db_validations');
const { validationOfDescrition , validarJWT , validarCampos, validationOfPrice, validationOfName, validationofCategoryId, isAdminRole } = require('../middlewares');


const router = Router();

//? public 
router.get('/' , getAllProducts)


//? public 

router.get('/:id', [

    check('id', 'el id no es valido').isMongoId(),
    check('id',).custom( validateExistProductById ),
    validarCampos

] , getProductById );

//? private - jwt 
router.post('/', [ 

    validarJWT,
    check('nombre' , 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom( validateExistProduct ),
    check('categoria' , 'El Id  de la categoria no es valido').isMongoId(),
    check('categoria').custom( validateExistCategoryById ), 
    validationOfDescrition,
    validationOfPrice,
    validarCampos

] , createAProduct );


//? private - jwt - id the product and category
router.put('/:id' , [ 
    validarJWT,
    validationOfDescrition,
    validationOfPrice,
    validationOfName,
    validationofCategoryId,
    validarCampos

] , updateProduct )

//? private - jwt - id the product
router.delete('/:id' , [
    validarJWT,
    check('id', 'el id no es valido').isMongoId(),
    check('id',).custom( validateExistProductById ),
    isAdminRole,
    validarCampos

] , deleteProduct)



module.exports = router;