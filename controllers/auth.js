// Module import
const UserSchema = require('../schemas/user');

const asyncErrorWrapper = require('express-async-handler')

const tokenHelpers = require('../helpers/auth/tokenHelpers');

const validation = require('../helpers/validation/valdiationHelper');

const CustomError = require('../helpers/error/CustomError');

// Controller class Auth
class AuthController {

    register = asyncErrorWrapper(async (req, res) => {

        const { name, email, password, role } = req.body;

        const user = await UserSchema.create({
            name,
            email,
            password,
            role
        })

        tokenHelpers.sendJwtToClient(user, res)

    });

    getUser = (req, res) => {

        const user = req.user;

        res
            .status(200)
            .json({
                success: true,
                data: user
            })

    };

    login = asyncErrorWrapper(async (req, res, next) => {

        const { email, password } = req.body;

        if (!validation.validationUserInput(email, password)) {

            return next(new CustomError("Please check your input", 400));

        };

        const user = await UserSchema.findOne({ email: email }).select("name email password");

        if (!validation.comparePassword(password, user.password)) {

            return next(new CustomError("Please check your credentials", 400));

        }

        tokenHelpers.sendJwtToClient(user, res);

    });

    logout = asyncErrorWrapper(async (req, res, next) => {

        const { NODE_ENV } = process.env;

        return res.status(200).cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        }).json({
            success: true,
            message: "Log out successful"
        });

    });
    upload = asyncErrorWrapper (async (req,res,next) =>{

    });
}

module.exports = new AuthController();