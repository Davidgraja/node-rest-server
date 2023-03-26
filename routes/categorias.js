const {Router} = require('express');
const {check} = require('express-validator');
const { createCategory, getCategories , getCategory, updateCategory, deleteCategory } = require('../controllers/categorias.controller');
const { validateExistCategoryById } = require('../helpers/db_validations');
const { validarJWT , validarCampos, isAdminRole } = require('../middlewares');

const router = Router();

//? get all the categories - public  : 

router.get('/' , getCategories)

//? get one category for your  id  - public :

router.get('/:id', [
    check('id' , 'el id enviado no es valido').isMongoId(),
    check('id').custom( validateExistCategoryById ),
    validarCampos
] ,  getCategory  )

//? create a category - private - any person with a valid token : 

router.post('/' , [

    validarJWT ,
    check('nombre' , 'El nombre es obligatorio').notEmpty(),
    validarCampos

] ,  createCategory )

//? update record  - private -  any person with a valid token :  

router.put('/:id', [
    validarJWT,
    check('id' , 'el id enviado no es valido').isMongoId(),
    check('id').custom( validateExistCategoryById ),
    check('nombre' , 'el nombre de la categoria es obligatorio').notEmpty(),
    validarCampos
] , updateCategory)

//? delete record - private - person with a rol admin and valid token : 

router.delete('/:id' , [
    validarJWT,
    isAdminRole,
    check('id' , 'el id enviado no es valido').isMongoId(),
    check('id').custom( validateExistCategoryById ),
    validarCampos
] , deleteCategory)


module.exports = router;