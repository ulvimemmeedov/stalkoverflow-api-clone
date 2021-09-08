// library import
const express = require('express');

const dotenv = require('dotenv');
// environment variables config
dotenv.config({
    path: "./config/env/globalConfig.env"
});
// express instance
const app = express();
// server variable
const HOST = process.env.HOST;

const PORT = process.env.PORT;

const NODE_ENV = process.env.NODE_ENV;
//router
const routers = require('./routers/routeIndex');
//// Server config
// Router middleware
app.use('/api/',routers);

app.listen(PORT,HOST,()=>console.log(`App running http://${HOST}:${PORT} : ${NODE_ENV}`));