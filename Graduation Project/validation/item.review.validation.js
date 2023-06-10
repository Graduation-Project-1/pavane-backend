const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addItemReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().required().messages({
            "number.base": "please enter a valid rate",
            "any.required": "You have to enter rate",
        }),
        itemId: Joi.objectId().required().messages({
            "string.empty": "You have to enter item Id",
            "any.required": "You have to enter item Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const updateItemReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().messages({
            "number.base": "please enter a valid rate"
        }),
        itemId: Joi.objectId().messages({
            "string.empty": "You have to enter item Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


module.exports = {
    addItemReviewValidation,
    updateItemReviewValidation,
}