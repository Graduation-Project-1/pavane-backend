const app = require('express').Router();
const { addItemReview, updateItemReview, deleteItemReview,
     getItemReviewById,getAllItemReviews,convertItemIdInItemReviews,convertCustomerIdInItemReviews } = require('../controller/itemReview/item.review.controller');
const { addItemReviewValidation, updateItemReviewValidation } = require('../validation/item.review.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_REVIEW,
    GET_REVIEW_BY_ID,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    GET_ALL_REVIEW,} = require('../endPoints/endPoints');


app.post('/addItemReview',[isAuthorized(ADD_REVIEW),validator(addItemReviewValidation)], addItemReview);
app.get('/getItemReviewById/:id',[isAuthorized(GET_REVIEW_BY_ID)], getItemReviewById);
app.put('/updateItemReview/:id',[isAuthorized(UPDATE_REVIEW),validator(updateItemReviewValidation)], updateItemReview);
app.delete('/deleteItemReview/:id',[isAuthorized(DELETE_REVIEW)], deleteItemReview);
app.get('/getAllItemReviews/:id',[isAuthorized(GET_ALL_REVIEW)], getAllItemReviews);

app.get('/convertItemIdInItemReviews',convertItemIdInItemReviews);
app.get('/convertCustomerIdInItemReviews',convertCustomerIdInItemReviews);
module.exports = app;