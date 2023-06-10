const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const loginBrandValidation = {
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


const addBrandValidation = {
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
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        phone: Joi.array().required().items(Joi.string().messages({
            "string.base": "the phone list must be string",
        }),).messages({
            "any.required": "you have to enter the phone",
        }),
        categoryList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
    })
}


const updateBrandValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        email: Joi.string().email().messages({
            "string.empty": "you have to enter the email",
            "string.email": "you should enter vaild email",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        phone: Joi.array().items(Joi.string().messages({
            "string.base": "the phone must be string",
        }),),
        categoryList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
    })
}

module.exports = {
    loginBrandValidation,
    addBrandValidation,
    updateBrandValidation,
}