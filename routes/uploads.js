const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { fileUpload } = require('../controllers/uploads.controllers');

const router = Router();

router.post('/' , fileUpload);

module.exports = router;