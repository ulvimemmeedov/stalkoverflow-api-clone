// Token Helper class
class TokenHelpers {

     sendJwtToClient = (user, res) => {

        const token = user.generateJwtFromUser();
    
        const { JTW_COOKIE, NODE_ENV } = process.env;
    
        return res
    
            .status(200)
    
            .cookie("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + parseInt(JTW_COOKIE) * 1000 * 60),
                secure: NODE_ENV === "development" ? false : true
            })
    
            .json({
                success: true,
                access_token: token,
                message:"Success Auth",
                data: {
                    name: user.name,
                    email: user.email
                }
            });
    
    }
    
    isTokenIncluded = (req) => {
        return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
    }
    
    getAccessTokenFromHeader = (req) =>{
        
        const authorization = req.headers.authorization;
        
        const access_token = authorization.split(" ")[1];
    
        return access_token;
    
    }
    
}

module.exports = new TokenHelpers;
