const {Router} = require('express');
const {check} = require('express-validator');
const { fileUpload , updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads.controllers');
const { collectionsAllowed } = require('../helpers');
const { validarCampos , validateUploadsFiles } = require('../middlewares');

const router = Router();

router.post('/', validateUploadsFiles , fileUpload);

router.put('/:collection/:id',[
    validateUploadsFiles,
    check('id'  , 'El id no es valido').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c , ['usuarios', 'productos'] ) ),
    validarCampos
] , updateImageCloudinary );

router.get('/:collection/:id',[
    // validateUploadsFiles,
    check('id'  , 'El id no es valido').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c , ['usuarios', 'productos'] ) ),
    validarCampos
] , showImage );

module.exports = router;