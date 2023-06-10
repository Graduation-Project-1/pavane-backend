const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addCollectionReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().required().messages({
            "number.base": "please enter a valid rate",
            "any.required": "You have to enter rate",
        }),
        collectionId: Joi.objectId().required().messages({
            "string.empty": "You have to enter collection Id",
            "any.required": "You have to enter collection Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const updateCollectionReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().messages({
            "number.base": "please enter a valid rate"
        }),
        collectionId: Joi.objectId().messages({
            "string.empty": "You have to enter collection Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


module.exports = {
    addCollectionReviewValidation,
    updateCollectionReviewValidation,
}