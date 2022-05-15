const { secret } = require("../../config/auth.config");
const { findSingleUser } = require("./User.service");
const { loginSchema, registerSchema, authToken } = require("./User.validations");
const jwt = require('jsonwebtoken')

exports.validateUserRegisteration = async (req, res, next) => {
    try {
        let { username, password } = req.body;

        let valid = await registerSchema.validateAsync(req.body);

        next();
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }
}

exports.validateUserLogin = async (req, res, next) => {
    try {
        let { username, password } = req.body;

        let valid = await loginSchema.validateAsync(req.body);

        let user = await findSingleUser({ username });

        res.locals.user = user;

        next();
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }
}


exports.isAuthenticated = async (req, res, next) => {
    try {
        let token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ? req.headers.authorization.split(' ')[1] : req.body.authorization;

        console.log(token);

        let valid = await authToken.validateAsync({ token });

        let decoded = await jwt.verify(token, secret);

        console.log(decoded);
        
        let user = await findSingleUser({ username: decoded.username });

        console.log(user);
        res.locals.user = user;

        next();
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'something went wrong'
        })
    }

};