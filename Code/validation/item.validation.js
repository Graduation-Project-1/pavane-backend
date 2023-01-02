const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addItemValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().required().messages({
            "string.empty": "you have to enter the name",
            "any.required": "you have to enter the name",
        }),
        price: Joi.number().required().messages({
            "any.required": "You have to enter product price",
            "number.base": "please enter a valid price"
        }),
        description: Joi.string().required().messages({
            "string.empty": "you have to enter the description",
            "any.required": "you have to enter the description",
        }),
        cover: Joi.string().messages({
            "string.empty": "you have to enter the description",
        }),
        images: Joi.array().items(Joi.string().messages({
            "string.base": "the images list must be string",
        }),),
        colors: Joi.array().items(Joi.string().messages({
            "string.base": "the availableColors list must be string",
        }),).messages({
            "any.required": "you have to enter colors list",
        }),
        sizes: Joi.array().items(Joi.string().messages({
            "string.base": "the availableSize list must be string",
        }),).messages({
            "any.required": "you have to enter sizes list",
        }),
        isAdult: Joi.boolean().required().messages({
            "boolean.base": "please enter a valid answer",
            "any.required": "you have to enter isAdult or not",
        }),
        gender: Joi.string().required().messages({
            "string.empty": "you have to enter the gender",
            "any.required": "you have to enter the gender",
        }),
        discountRate: Joi.number().messages({
            "number.base": "please enter a valid discountRate"
        }),
        brandId: Joi.objectId().required().messages({
            "string.empty": "You have to enter brand Id",
            "any.required": "You have to enter brand Id",
            "string.pattern.name" : "you should enter vaild ObjectId in brandId",
        }),
        categoryList: Joi.array().required().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId in categoryList",
        }),).messages({
            "any.required": "You have to enter categoryList",
        }),
        collectionId: Joi.objectId().messages({
            "string.empty": "You have to enter collection Id",
            "string.pattern.name" : "you should enter vaild ObjectId in collectionId",
        }),
    })
}


const updateItemValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        price: Joi.number().messages({
            "number.base": "please enter a valid price"
        }),
        description: Joi.string().messages({
            "string.empty": "you have to enter the description",
        }),
        cover: Joi.string().messages({
            "string.empty": "you have to enter the description",
        }),
        images: Joi.array().items(Joi.string().messages({
            "string.base": "the images list must be string",
        }),),
        colors: Joi.array().items(Joi.string().messages({
            "string.base": "the availableColors list must be string",
        }),),
        sizes: Joi.array().items(Joi.string().messages({
            "string.base": "the availableSize list must be string",
        }),),
        isAdult: Joi.boolean().messages({
            "boolean.base": "please enter a valid answer",
        }),
        gender: Joi.string().messages({
            "string.empty": "you have to enter the gender",
        }),
        discountRate: Joi.number().messages({
            "number.base": "please enter a valid discountRate"
        }),
        brandId: Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
        categoryList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
        collectionId: Joi.objectId().messages({
            "string.empty": "You have to enter collection Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const addOfferValidation = {
    body: Joi.object().required().keys({
        discountRate: Joi.number().required().messages({
            "any.required": "You have to enter discountRate",
            "number.base": "please enter a valid discountRate"
        }),
    })
}

module.exports = {
    addItemValidation,
    updateItemValidation,
    addOfferValidation,
}