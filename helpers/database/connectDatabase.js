const mongoose = require("mongoose");

class Database {
    constructor (){
        this.connect = this.connect;
    }
    connect () {
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
        }).then(() => {
                try {
                    console.log(`Database connection success db : ${process.env.MONGO_URI}`);
        
                } catch (error) {
                    console.log(error);
                };
            });
    }
};
module.exports = new Database;