// Library import
const bcrypt = require('bcryptjs');
// Validation Class
class ValdiationHelper {

    validationUserInput = (email,password) => {
        
        return email && password;
    
    }
    comparePassword = (password,hashedPassword) => {

       return bcrypt.compareSync(password,hashedPassword);

    }

};

module.exports = new ValdiationHelper();