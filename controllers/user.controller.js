const { response , request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response ) => {

    const query = { estado : true }
    
    const { limit = 0 , from = 0 } = req.query;
    
    const [total , usuarios] = await Promise.all([
        Usuario.countDocuments( query ),

        Usuario.find( query )
            .skip(Number(from))
            .limit( Number(limit))
    ]) 
    
    res.json({
        total,
        usuarios
    })

}

const usuariosPut =  async (req = request, res = response ) => {

    const id = req.params.id;
    const { _id ,password , google ,correo, ...informationUser } = req.body;
    
    if( password ){
        const salt = bcrypt.genSaltSync();
        informationUser.password = bcrypt.hashSync(password , salt);
    }

    if(correo){
        informationUser.correo = correo
    }

    const usuario = await Usuario.findByIdAndUpdate(id , informationUser ,{new:true});

    res.json({
        "message" : "Usuario actualizado",
        usuario
    })

}


const usuariosPost = async (req = request, res = response ) => {

    const {nombre , correo , password  , rol } = req.body;

    const usuario = new Usuario({nombre , correo , password , rol});

    //* encriptación  de la contraseña 

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password , salt);

    //* Guardar en la base de datos 
    await usuario.save();

    res.json({
        message : "Usuario creado con exito",
        usuario 
    })

}

const usuariosDelete = async (req = request, res = response ) => {

    const {id} = req.params;
    
    //* Borrar fisicamente  
    // const usuario = await Usuario.findByIdAndDelete(id);

    //* Forma recomendada , esto para mantener la integridad referencial en la base de datos
    const usuario = await Usuario.findByIdAndUpdate( id , { estado : false } , {new : true} );

    res.json({
        message : "Usuario eliminado",    
        usuario
    })

}

const usuariosPatch = (req = request, res = response ) => {
    
    
    res.json({
        "msg" : "patch api - controlador"
    })

}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
