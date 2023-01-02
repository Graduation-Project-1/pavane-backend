const Joi = require('joi');

const loginAdminValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email().messages({
            "string.empty": "you have to enter the email",
            "string.email": "you should enter vaild email",
            "any.required": "you have to enter the email",
        }),
        password: Joi.string().required().messages({
            "string.empty": "you have to enter the password",
            "any.required": "you have to enter the password",
        }),
    })
}


const addAdminValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().required().messages({
            "string.empty": "you have to enter the name",
            "any.required": "you have to enter the name",
        }),
        email: Joi.string().required().email().messages({
            "string.empty": "you have to enter the email",
            "string.email": "you should enter vaild email",
            "any.required": "you have to enter the email",
        }),
        password: Joi.string().required().messages({
            "string.empty": "you have to enter the password",
            "any.required": "you have to enter the password",
        }),
    })
}


const updateAdminValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        email: Joi.string().email().messages({
            "string.empty": "you have to enter the email",
            "string.email": "you should enter vaild email",
        }),
    })
}

module.exports = {
    addAdminValidation,
    loginAdminValidation,
    updateAdminValidation,
}