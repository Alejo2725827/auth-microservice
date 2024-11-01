const express = require('express');

require('dotenv').config(); // Enviroments

const http = require('http');

const app = express();


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
    connectMongoDb () {
        require('./database/mongo.connection')
    }

    useMiddleWares () {
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