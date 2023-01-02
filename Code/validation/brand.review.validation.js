const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addBrandReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().required().messages({
            "number.base": "please enter a valid rate",
            "any.required": "You have to enter rate",
        }),
        brandId: Joi.objectId().required().messages({
            "string.empty": "You have to enter brand Id",
            "any.required": "You have to enter brand Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const updateBrandReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().messages({
            "number.base": "please enter a valid rate"
        }),
        brandId: Joi.objectId().messages({
            "string.empty": "You have to enter brand Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


module.exports = {
    addBrandReviewValidation,
    updateBrandReviewValidation,
}