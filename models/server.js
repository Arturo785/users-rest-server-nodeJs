
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

require('dotenv').config();



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
        this.authPath = '/api/auth';

        // connect to db
        this.databaseConnect();

        this.middlewares(); // order matters
        this.routes(); // triggers the init of the routes when called
    }

    async databaseConnect() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Parse and lecture of body to use JSON
        this.app.use(express.json());

        // we connect our public resources to static express content
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersRoutePath, require('../routes/user'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Running on ${this.port}`)
        });
    }

}


module.exports = Server;