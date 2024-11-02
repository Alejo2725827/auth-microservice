const express = require('express');
require('dotenv').config(); // Enviroments
const http = require('http');
const cors = require('cors')

const app = express();
const corsOptions = {
    origin: ['http://localhost:4200'],
    // origin: true,
    methods: [
        'POST',
        'GET',
        'PUT',
        'DELETE',
        'PUT',
        'PATCH',
        'OPTIONS',
    ],
    allowedHeaders: [
        'authorization',
        'xAuth',
        'Content-Type',
        'X-Requested-With',
        'rol'
    ],
    exposedHeaders: [
        'authorization', 'xAuth', 'Content-Type', 'Accept'
    ],
    credentials: true
}

//Rutas
const routes = require('./routing')

class Server {
    constructor() {
        this.init();
    }

    init() {
        this.connectMongoDb();
        this.useMiddleWares();
        this.addRoutes();
        this.listenServer();
    }
    connectMongoDb() {
        require('./database/mongo.connection')
    }

    useMiddleWares() {
        app.use(cors(corsOptions))
        app.use(express.json({ limit: '50mb' })); // Parser JSON
        app.use(express.urlencoded({ limit: '50mb', extended: true })); // Parser URL encoded
    }

    addRoutes() {
        app.use(`/auth`, routes.auth);
    }

    listenServer() {

        const server = http.createServer(app);
        server.listen(process.env.PORT, () => {
            console.log(`Servidor HTTP en ejecución en el puerto ${process.env.PORT}`);
        });
        return server;

    }

}

new Server();