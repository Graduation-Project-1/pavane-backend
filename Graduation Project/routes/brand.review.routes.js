const app = require('express').Router();
const { addBrandReview, updateBrandReview, deleteBrandReview,
     getBrandReviewById,getAllBrandReviews } = require('../controller/brandReview/brand.review.controller');
const { addBrandReviewValidation, updateBrandReviewValidation } = require('../validation/brand.review.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_REVIEW,
    GET_REVIEW_BY_ID,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    GET_ALL_REVIEW,} = require('../endPoints/endPoints');


app.post('/addBrandReview',[isAuthorized(ADD_REVIEW),validator(addBrandReviewValidation)], addBrandReview);
app.get('/getBrandReviewById/:id',[isAuthorized(GET_REVIEW_BY_ID)], getBrandReviewById);
app.put('/updateBrandReview/:id',[isAuthorized(UPDATE_REVIEW),validator(updateBrandReviewValidation)], updateBrandReview);
app.delete('/deleteBrandReview/:id',[isAuthorized(DELETE_REVIEW)], deleteBrandReview);
app.get('/getAllBrandReviews/:id',[isAuthorized(GET_ALL_REVIEW)], getAllBrandReviews);


module.exports = app;