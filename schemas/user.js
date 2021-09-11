// Library import
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const jwt = require("jsonwebtoken");
// Constants
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        required:[true,"Please provide a name"]
    },
    email : {
        type : String,
        required: [true,"Please provide a email"],
        unique : true,
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    password : {
        type : String,
        minlength : 6,
        required : [true,"Please provide a password"],
        select : false
    },
    createdAt : {
        type : Date,
        default : Date.now

    },
    title : {
        type: String
    },
    about : {
        type:String
    },
    website : {
        type: String 
    },
    place : {
        type: String
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    blocked : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : {
        type:String
    },
    resetPasswordExpire: {
        type : Date
    }

});
// UserSchema Methods
UserSchema.methods.generateJwtFromUser = function () {

    const {JWT_SECRET,JWT_EXPIRE} = process.env;

    const payload = {

        id:this.id,
        name:this.name,
        email:this.email
        
    }
    
    const token = jwt.sign(payload,JWT_SECRET,{
        expiresIn:JWT_EXPIRE,
        algorithm:"HS256"
    })

    return token;
}
// Password reset
UserSchema.methods.getResetPasswordTokenFromUser = function () {
    
    const {RESET_PASSWORD_EXPIRE} = process.env

    const randomHexString = crypto.randomBytes(15).toString("hex");

    const resetPasswordToken = crypto
    .createHash('SHA256')
    .update(randomHexString)
    .digest('hex');
    
    this.resetPasswordToken = resetPasswordToken;
    
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;
}
// Pre hooks
UserSchema.pre("save",function(next){
    if (!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10, (err,salt)=>{
        
        if (err) return next(err);
        
        bcrypt.hash(this.password,salt,(err,hash)=> {
            
            if(err) return next(err);

            this.password = hash;
            
            next();
        })
    })
})

module.exports = mongoose.model("Users",UserSchema);