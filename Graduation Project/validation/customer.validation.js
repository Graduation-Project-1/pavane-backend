const Joi = require('joi');


const loginCustomerValidation = {
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

const addCustomerValidation = {
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
        phone: Joi.string().required().messages({
            "string.empty": "you have to enter the phone",
            "any.required": "you have to enter the phone",
        }),
        dateOfBirth: Joi.date().required().messages({
            "date.base": "you should enter vaild date",
            "any.required": "you have to enter the date of birth",
        }),
        gender: Joi.string().required().messages({
            "string.empty": "you have to enter the gender",
            "any.required": "you have to enter the gender",
        }),
        location: Joi.string().messages({
            "string.empty": "you have to enter the location",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        cardNumber: Joi.array().items(Joi.string().messages({
            "string.base": "the cardNumber must be string",
        }),),
    })
}


const updateCustomerValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().optional().messages({
            "string.empty": "you have to enter the name",
        }),
        email: Joi.string().email().messages({
            "string.empty": "you have to enter the email",
            "string.email": "you should enter vaild email",
        }),
        phone: Joi.string().messages({
            "string.empty": "you have to enter the phone",
        }),
        dateOfBirth: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        gender: Joi.string().messages({
            "string.empty": "you have to enter the gender",
        }),
        location: Joi.string().messages({
            "string.empty": "you have to enter the gender",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        cardNumber: Joi.array().items(Joi.string().messages({
            "string.base": "the cardNumber must be string",
        }),),
    })
}

module.exports = {
    loginCustomerValidation,
    addCustomerValidation,
    updateCustomerValidation,
}