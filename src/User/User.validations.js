const joi = require('joi')

const userSchema = {
    username: joi.string()
        .alphanum()
        .min(5)
        .max(15)
        .required(),

    password: joi.string().min(8).required(),
    token: joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required()
    .error(errors=>{
        errors.forEach(err=>{
            throw {
                message:'Invalid token. Please login again'
            }
        })
    })
}

exports.registerSchema = joi.object({
    username: userSchema.username,

    password: userSchema.password
})

exports.loginSchema = joi.object({
    username: userSchema.username,

    password: userSchema.password
})


exports.authToken = joi.object({
    token: userSchema.token
})
