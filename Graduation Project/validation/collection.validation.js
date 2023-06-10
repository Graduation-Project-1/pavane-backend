const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addCollectionValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().required().messages({
            "string.empty": "you have to enter the name",
            "any.required": "you have to enter the name",
        }),
        season: Joi.string().messages({
            "string.empty": "you have to enter the season",
        }),
        date: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        discountRate: Joi.number().messages({
            "number.base": "please enter a valid discount"
        }),
        itemsList: Joi.array().required().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId in itemsList",
        }),).messages({
            "any.required": "You have to enter itemsList",
        }),
        categoryList: Joi.array().required().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId in categoryList",
        }),).messages({
            "any.required": "You have to enter categoryList",
        }),
        brandId: Joi.objectId().required().messages({
            "any.required": "You have to enter vendor Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const updateCollectionValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        season: Joi.string().messages({
            "string.empty": "you have to enter the season",
        }),
        date: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        discountRate: Joi.number().messages({
            "number.base": "please enter a valid discount"
        }),
        itemsList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
        categoryList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
        brandId: Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}

const archiveCollectionValidation = {
    body: Joi.object().required().keys({
        archiveItemList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
    })
}

module.exports = {
    addCollectionValidation,
    updateCollectionValidation,
    archiveCollectionValidation,
}