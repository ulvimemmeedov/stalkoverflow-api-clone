// Library import
const express = require('express');

const path = require('path');

const dotenv = require('dotenv');
// Environment variables config
dotenv.config({
    path: "./config/env/globalConfig.env"
});
// Express instance
const app = express();
// Server variable
const { TITLE,HOST,PORT,NODE_ENV,VERSION,AUTHOR,LICENSE } = process.env
// Router
const routers = require('./routers/routeIndex');
//// Server config
const database = require('./helpers/database/connectDatabase');
// Custom Error Handler
const customErrorHandler = require('./middlewares/errors/customErrorHandler');

class App {

    constructor() {

        database.connect();

        app
            .locals.title = TITLE;

        if (NODE_ENV === "development") {
            
            const Start = {
                "name": TITLE,
                "version": VERSION,
                "author": AUTHOR,
                "license": LICENSE,
                "NODE_ENV":NODE_ENV
            }
            app
                .get("/", function (req, res) {
                    res.status(200).json(Start)
                })
            console.log(Start);
        }else{
            console.log(NODE_ENV);
        }

        app
            .use(express.static(path.join(__dirname,"public")))
            .use(express.json())
            .use('/api/', routers)
            .use(customErrorHandler)
            .listen(PORT, HOST, () => console.log(`App running http://${HOST}:${PORT} : ${NODE_ENV}`));
    }

}

const init = new App();