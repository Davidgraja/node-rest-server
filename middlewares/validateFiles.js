const validateUploadsFiles = ( req = request , res = response , next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        return  res.status(400).json({message : 'no hay archivos que subir'});
    }

    next();

}

module.exports = {
    validateUploadsFiles
}