const { Router } = require('express');
const { check } = require('express-validator');
const { createAProduct, getAllProducts } = require('../controllers/producto.controller');
const { validateExistCategoryById, validateExistProduct } = require('../helpers/db_validations');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.get('/' , getAllProducts)

router.get('/:id' , ( req , res ) => {
    
    res.json({
        message : 'get-id'
    })

});


router.post('/', [ 

    validarJWT,
    check('nombre' , 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom( validateExistProduct ),
    check('precio' , 'El precio es oblidatorio').isNumeric().notEmpty(),
    check('categoria' , 'El Id  de la categoria no es valido').isMongoId(),
    check('categoria').custom( validateExistCategoryById ),
    validarCampos

] , createAProduct );



router.put('/:id' , ( req , res ) => {
    
    res.json({
        message : 'put-productos'
    })

})

router.delete('/:id' , ( req , res ) => {
    
    res.json({
        message : 'delete-productos'
    })

})



module.exports = router;