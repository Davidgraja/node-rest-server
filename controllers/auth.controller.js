const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar_jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request , res = response) => {

    const { correo , password } = req.body;

    try {

        //? Verificación de que exista el correo 
        const usuario = await Usuario.findOne({correo});
        
        if( !usuario ){
            return res.status(400).json({
                message : 'correo / passsword no son correctos - correo'
            });
        }

        //? Verificación si el usuario esta activo 
        if( !usuario.estado ){
            return res.status(400).json({
                message : 'correo / passsword no son correctos - estado : false'
            });
        }

        //? Verificación de la contraseña 
        const validatePassword = bcryptjs.compareSync(password , usuario.password);

        if( !validatePassword ){
            return res.status(400).json({
                message : 'correo / passsword no son correctos - password : false'
            });
        }

        //? Generación del JWT 
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        

    } catch (error) {
        
        return res.status(500).json({
            message : 'Por favor comuniquese con el administrador'
        });

    }
}


const googleSingIn = async ( req = request , res = response ) =>{

    const {id_token} = req.body;

    try {
        
        const { nombre , img , correo } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });

        //? crear el usuario si no existe
        if(  !usuario ){
            const data = {
                nombre,
                correo,
                img,
                password : ':P',
                google : true , 
                rol : 'USER_ROLE'
            }

            usuario = new Usuario(data);
            await usuario.save();

        }

        // //? verificación de que este activo el usuario en la base de datos 
        if( !usuario.estado ){
            return res.status(401).json({
                message : 'Autenticacion no permitida por un bloqueo de usuario , hable con el administrador'
            })
        }

        //? Generación del JWT 
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            message : 'Autenticacion incorrecta , Token no aceptado'
        })
    }


}

module.exports = {
    login ,
    googleSingIn
}