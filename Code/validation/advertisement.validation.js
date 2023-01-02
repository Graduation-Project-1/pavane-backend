const Joi = require('joi');

const addAdvertisementValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().required().messages({
            "string.empty": "you have to enter the name",
            "any.required": "you have to enter the name",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        link: Joi.string().messages({
            "string.empty": "you have to enter the link",
        }),
        startDate: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        endDate: Joi.date().required().messages({
            "date.base": "you should enter vaild date",
            "any.required": "you have to enter the endDate",
        }),
        creatorName: Joi.string().required().messages({
            "string.empty": "you have to enter the creatorName",
            "any.required": "you have to enter the creatorName",
        }),
    })
}

const updateAdvertisementValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        link: Joi.string().messages({
            "string.empty": "you have to enter the link",
        }),
        startDate: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        endDate: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        creatorName: Joi.string().messages({
            "string.empty": "you have to enter the creatorName",
        }),
    })
}

module.exports = {
    addAdvertisementValidation,
    updateAdvertisementValidation,
}