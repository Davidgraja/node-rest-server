const { v4: uuidv4 } = require('uuid');

//? Paquete de node para manejar rutas internas dentro de nuestro servidor
const path = require('path');

const helpUploadFile = (files , extensiones =  ['png' , 'jpg' , 'jpeg' , 'gif'] , folder = '') => {

    return new Promise(( resolve , reject )=>{

        const { file } =  files;

        const cutName = file.name.split('.');
        
        const extension = cutName[ cutName.length - 1 ]

        //? validar extension :
        if( !extensiones.includes(extension) ) {
            return reject(`La extensión ${ extension } no es permitida , pruebe con las siguientes extensiones : ${ extensiones }`)
        
        }

        const nameTemporary = uuidv4() + '.' + extension;

        const uploadPath = path.join( __dirname , '../uploads/' , folder , nameTemporary );
        

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
        
            resolve( nameTemporary );
        });
        
    })

}

module.exports = {
    helpUploadFile
}