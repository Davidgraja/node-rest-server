const { request, response } = require("express");
const { helpUploadFile } = require("../helpers");


const fileUpload = async ( req = request , res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(400).json({message : 'no hay archivos que subir'});
        return;
    }
    
    try {
        
        // images
        const nameFile = await helpUploadFile(req.files);
    
        res.json({ nameFile });
        
    } catch (error) {
        res.status(400).json({
            message : error
        });
    }

}

module.exports = {
    fileUpload
}