const app = require('express').Router();
const { addCollectionReview, updateCollectionReview, deleteCollectionReview,
     getCollectionReviewById,getAllCollectionReviews } = require('../controller/collectionReview/collection.review.controller');
const { addCollectionReviewValidation, updateCollectionReviewValidation } = require('../validation/collection.review.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_REVIEW,
    GET_REVIEW_BY_ID,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    GET_ALL_REVIEW,} = require('../endPoints/endPoints');


app.post('/addCollectionReview',[isAuthorized(ADD_REVIEW),validator(addCollectionReviewValidation)], addCollectionReview);
app.get('/getCollectionReviewById/:id',[isAuthorized(GET_REVIEW_BY_ID)], getCollectionReviewById);
app.put('/updateCollectionReview/:id',[isAuthorized(UPDATE_REVIEW),validator(updateCollectionReviewValidation)], updateCollectionReview);
app.delete('/deleteCollectionReview/:id',[isAuthorized(DELETE_REVIEW)], deleteCollectionReview);
app.get('/getAllCollectionReviews/:id',[isAuthorized(GET_ALL_REVIEW)], getAllCollectionReviews);


module.exports = app;