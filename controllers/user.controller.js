const { response , request } = require('express');


const usuariosGet = (req = request, res = response ) => {
    /*forma de obtener querys params de nuestro rest-api */
    const {q , id , apikey , limit = '1' , name = 'Name no found'} = req.query;

    res.json({
        "msg" : "get api - controlador",
        q,
        id,
        apikey,
        limit,
        name
    })

}

const usuariosPut = (req, res = response ) => {
    /*obtener los parametros enviados*/
    const id = req.params.id;

    res.json({
        "msg" : "put api - controlador",
        id
    })

}


const usuariosPost = (req, res = response ) => {
    const body = req.body;

    res.json({
        "msg" : "post api - controlador",
        body
    })

}

const usuariosDelete = (req, res = response ) => {

    res.json({
        "msg" : "delete api - controlador"
    })

}

const usuariosPatch = (req, res = response ) => {

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
