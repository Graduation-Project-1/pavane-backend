const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addOfferValidation = {
    body: Joi.object().required().keys({
        discountRate: Joi.number().messages({
            "number.base": "please enter a valid discountRate"
        }),
        vendorId: Joi.objectId().required().messages({
            "any.required": "You have to enter vendor Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
        productId: Joi.objectId().required().messages({
            "any.required": "You have to enter product Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
        categoryId: Joi.objectId().required().messages({
            "any.required": "You have to enter category Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const updateOfferValidation = {
    body: Joi.object().required().keys({
        discountRate: Joi.number().messages({
            "number.base": "please enter a valid discountRate"
        }),
        vendorId: Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
        productId: Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
        categoryId: Joi.objectId().messages({
            "any.required": "You have to enter product Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}

module.exports = {
    addOfferValidation,
    updateOfferValidation,
}