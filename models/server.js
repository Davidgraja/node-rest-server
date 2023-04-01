const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            search : '/api/search',
            categorias : '/api/categorias',
            productos : '/api/productos',
            productosPorCategoria : '/api/productos/categoria',
            usuarios : '/api/usuarios'
        }
        

        // conección de la base de datos 
        this.conectarDB();

        /*Middlewares*/
        this.middlewares();

        /*Rutas del servidor*/
        this.routes();

    }

    async conectarDB(){
        await dbConection();
    }

    middlewares (){

        /*Lectura y pareseo de la informacion del body*/

        this.app.use(express.json())

        /*Configuración de Cors*/
        this.app.use(cors());

        /*Dicrectorio publico*/
        this.app.use(express.static('public'));
    }

    routes (){

        this.app.use( this.paths.categorias , require('../routes/categorias'));
        this.app.use( this.paths.productos , require('../routes/producto'));
        this.app.use(this.paths.productosPorCategoria , require('../routes/productsByCategory'));
        this.app.use( this.paths.usuarios , require('../routes/user'));
        this.app.use(this.paths.auth , require('../routes/auth'));
        this.app.use(this.paths.search , require('../routes/search'));
        
    }


    listen (){
        this.app.listen( this.port , () => {
            console.log('this server is listening in the port ' + this.port)
        });
    }
}

module.exports = Server;