const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async (req = request , res = response) => {

    const { correo , password } = req.body;

    try {

        //TODO : Verificar de que exista el correo 
        const usuario = await Usuario.findOne({correo});
        
        if( !usuario ){
            return res.status(400).json({
                message : 'correo / passsword no son correctos - correo'
            });
        }

        //TODO : Verificar si el usuario esta activo 
        if( !usuario.estado ){
            return res.status(400).json({
                message : 'correo / passsword no son correctos - estado : false'
            });
        }

        //TODO : Verificar la contraseña 

        const validatePassword = bcryptjs.compareSync(password , usuario.password);

        if( !validatePassword ){
            return res.status(400).json({
                message : 'correo / passsword no son correctos - password : false'
            });
        }

        //TODO : Generar el JWT 




        res.json({
            message : 'login ok'
        })
        

    } catch (error) {
        
        return res.status(500).json({
            message : 'Por favor comuniquese con el administrador'
        });

    }
}

module.exports = {
    login
}