const Joi = require('joi');

const addCategoryValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().required().messages({
            "string.empty": "you have to enter the name",
            "any.required": "you have to enter the name",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
    })
}


const updateCategoryValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
    })
}

module.exports = {
    addCategoryValidation,
    updateCategoryValidation,
}