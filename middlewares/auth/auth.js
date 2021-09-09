// Library import
const { get } = require("express/lib/response");
const jwt = require("jsonwebtoken");
// Module import
const tokenHelpers = require("../../helpers/auth/tokenHelpers");

const CustomError = require("../../helpers/error/CustomError")
// Variable import
const {JWT_SECRET} = process.env;
// Auth class
class Auth {
    
    getAccessToRoute = (req,res,next) =>{

        if (!tokenHelpers.isTokenIncluded(req)) {
            
            return next(new CustomError("You are not authorized to access this route",401))
        
        }
    
        const access_token = tokenHelpers.getAccessTokenFromHeader(req);
        
        jwt.verify(access_token,JWT_SECRET,(err,decoded)=>{

            if (err) {
        
                return next(new CustomError("You are not authorized to access this route",401))
        
            }
        
            req.user = {
                id : decoded.id,
                name : decoded.name,
                email : decoded.email
            }
        
            next();
            
        });
    }
    
}
module.exports = new Auth();