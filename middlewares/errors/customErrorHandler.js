// Module import
const CustomError = require("../../helpers/error/CustomError");

const fs = require('fs');

const path = require('path');
// CustomErrorHandler Function
const customErrorHandler = (e, req, res, next) => {

    let customError = e;

    if (e.fatal) {
        console.log(customError);
        const nd = new Date();
        const y = nd.getFullYear();
        const m = (nd.getMonth() + 1);
        const d = nd.getDate();
        const h = nd.getHours();
        const mm = nd.getMinutes();
        const s = nd.getSeconds();
        if (!fs.existsSync(path.resolve(__dirname, '../error_logs'))) { fs.mkdirSync(path.resolve(__dirname, '../error_logs')); }
        if (!fs.existsSync(path.resolve(__dirname, '../error_logs', `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`))) { fs.mkdirSync(path.resolve(__dirname, '../error_logs', `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`)); }
        fs.writeFileSync(path.resolve(__dirname, '../error_logs', `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`, `log-${h < 10 ? `0${h}` : h}-${mm < 10 ? `0${mm}` : mm}-${s < 10 ? `0${s}` : s}.json`), JSON.stringify(e, null, 2));
    }

    if (e.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax", 400)
    }

    if (e.name === "ValidationError") {
        customError = new CustomError(e.message, 400);
    }

    if (e.name === "MongoServerError") {
        customError = new CustomError("Database Server Error", e.status);
    }
    
    if (e.code === 11000) {
        customError = new CustomError(`Dublicate key error code : ${e.code}`,400);
    }
    
    if (e.name === "MongoError") {
        customError = new CustomError(`Database Server Error code : ${e.code}`, e.status);
    }
    // console.log(customError.name, customError.message, customError.status || 500);
    res.status(customError.status || 500).json({
        success: false,
        error: {
            message: customError.message,
        }
    })
}

module.exports = customErrorHandler;