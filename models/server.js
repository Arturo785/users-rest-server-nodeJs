
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');

require('dotenv').config();



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usersRoutePath : '/api/users',
            authPath : '/api/auth',
            categoriesPath : '/api/categories',
            productsPath : '/api/products',
            searchPath : '/api/search',
            uploadPath : '/api/uploads',
        }

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

        //files middleware
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true // creates the folder if non existent
        }));
    }

    routes() {


        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usersRoutePath, require('../routes/user'));
        this.app.use(this.paths.categoriesPath, require('../routes/categories'));
        this.app.use(this.paths.productsPath, require('../routes/products'));
        this.app.use(this.paths.searchPath, require('../routes/globalSearch'));
        this.app.use(this.paths.uploadPath, require('../routes/uploads'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Running on ${this.port}`)
        });
    }

}


module.exports = Server;