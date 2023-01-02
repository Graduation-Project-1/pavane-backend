const app = require('express').Router();
const {loginCustomer, addCustomer, getCustomer, updateCustomer, deleteCustomer,addToWishList,deleteFromWishList,
likeItem, likeBrand, likeCollection,getLikedItems,getLikedBrands,
getlikedCollections, updateProfileCustomer, deleteProfileCustomer,getAllCustomers
,getCustomerById,getWishList, calculateNumberOfLikes } = require('../controller/customer/customer.controller');
const {loginCustomerValidation, addCustomerValidation, updateCustomerValidation } = require('../validation/customer.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {  
    GET_USER,
    UPDATE_USER,
    DELETE_USER,
    ADD_TO_WISH_LIST,
    DELETE_FROM_WISH_LIST,
    LIKE_PRODUCT,
    LIKE_VENDOR,
    LIKE_COLLECTION,
    GET_COLLECTION_LIST,
    GET_LIKED_PRODUCT,
    GET_LIKED_VENDOR,
    UPDATE_PROFILE_USER,
    DELETE_PROFILE_USER,
    GET_ALL_USER,
    GET_USER_BY_ID,
    GET_WISH_LIST} = require('../endPoints/endPoints');



app.post('/loginCustomer',validator(loginCustomerValidation), loginCustomer);
app.post('/addCustomer',[validator(addCustomerValidation)], addCustomer);
app.get('/getCustomer',[isAuthorized(GET_USER)], getCustomer);
app.put('/updateCustomer/:id',[isAuthorized(UPDATE_USER), validator(updateCustomerValidation)], updateCustomer);
app.delete('/deleteCustomer/:id',[isAuthorized(DELETE_USER)], deleteCustomer);
app.post('/addToWishList/:id',[isAuthorized(ADD_TO_WISH_LIST)], addToWishList);
app.delete('/deleteFromWishList/:id',[isAuthorized(DELETE_FROM_WISH_LIST)], deleteFromWishList);
app.get('/getWishList',[isAuthorized(GET_WISH_LIST)], getWishList);
app.get('/likeItem/:id',[isAuthorized(LIKE_PRODUCT)], likeItem);
app.get('/likeBrand/:id',[isAuthorized(LIKE_VENDOR)], likeBrand);
app.get('/likeCollection/:id',[isAuthorized(LIKE_COLLECTION)], likeCollection);
app.get('/getLikedItems',[isAuthorized(GET_LIKED_PRODUCT)], getLikedItems);
app.get('/getLikedBrands',[isAuthorized(GET_LIKED_VENDOR)], getLikedBrands);
app.get('/getlikedCollections',[isAuthorized(GET_COLLECTION_LIST)], getlikedCollections);
app.put('/updateProfileCustomer',[isAuthorized(UPDATE_PROFILE_USER), validator(updateCustomerValidation)], updateProfileCustomer);
app.delete('/deleteProfileCustomer',[isAuthorized(DELETE_PROFILE_USER)], deleteProfileCustomer);
app.get('/getAllCustomers',[isAuthorized(GET_ALL_USER)], getAllCustomers);
app.get('/getCustomerById/:id',[isAuthorized(GET_USER_BY_ID)], getCustomerById);

app.get('/calculateNumberOfLikes', calculateNumberOfLikes);

module.exports = app;