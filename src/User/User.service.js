const jwt = require('jsonwebtoken');
const { User, List } = require('..');
const bcrypt = require('bcryptjs');
const { secret } = require('../../config/auth.config');

exports.createUser = async ({ username, password, t }) => {
    try {

        let hashedPassword = bcrypt.hashSync(password, 8);

        let [user, created] = await User.findOrCreate({
            where: { username },
            defaults: {
                username,
                password: hashedPassword
            },
            transaction: t
        });

        if (!created) {
            throw {
                status: 409,
                message: 'This username already exists',
            }
        }

        return { user }
    } catch (error) {
        throw error;
    }
}

exports.loginUser = async ({ username, password, hashedPassword }) => {
    try {
        let passwordIsValid = bcrypt.compareSync(password, hashedPassword);

        if (!passwordIsValid) {
            throw {
                status: 401,
                message: 'Wrong password. Please try again',
            }
        };

        let token = jwt.sign({ username }, secret, {
            expiresIn: 86400
        });

        return { token }
    } catch (error) {
        throw error
    }
}

exports.findSingleUser = async ({ username }) => {
    try {
        let user = await User.findOne({
            where: {
                username
            },
            include: [{
                model: List
            }],
        })
        
        if (!user) {
            throw {
                status: 404,
                message: "This user doesn't exist"
            }
        }
        user = user.get({plain: true})


        return user;
    } catch (error) {
        throw error;
    }
}