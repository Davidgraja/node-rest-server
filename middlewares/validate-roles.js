const { request, response } = require("express")

const isAdminRole = ( req = request, res = response , next ) =>{
    
    if( !req.authenticatedUser ){
        return res.status(500).json({
            message : 'Se quiere verificar el role sin  validar el token'
        })
    }

    const {rol , nombre} = req.authenticatedUser; 

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            message : `El usuario ${ nombre } , no tiene un rol de administrador para ejecutar esta acción`
        })
    }

    next();

}


//? recibir argumentos en los middlewares 
const hasRole = ( ...roles ) => {
    
    return (req = request , res = response , next) => {

        if( !req.authenticatedUser ){
            return res.status(500).json({
                message : 'Se quiere verificar el role sin  validar el token'
            })
        }

        if( !roles.includes( req.authenticatedUser.rol ) ) {
            return res.status(401).json({
                message : ` Este servicio requiere alguno de estos roles ${ roles } `
            })
        }

        next();

    }

}

module.exports ={
    isAdminRole,
    hasRole
}