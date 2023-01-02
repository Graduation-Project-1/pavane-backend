const app = require('express').Router();
const {loginBrand, addBrand, getBrand, updateBrand, deleteBrand, 
    getBrandById,getAllBrands,getAllCategoriesByBrand, brandSearch,
updateProfileBrand, deleteProfileBrand,getMostLikedBrands, hashAllPassword } = require('../controller/brand/brand.controller');
const { addBrandValidation, loginBrandValidation, updateBrandValidation } = require('../validation/brand.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_VENDOR,
    GET_VENDOR,
    UPDATE_VENDOR,
    DELETE_VENDOR,
    GET_VENDOR_BY_ID,
    GET__ALL_VENDOR,
    GET_ALL_CATEGORY_BY_VENDOR,
    VENDOR_SEARCH,
    UPDATE_PROFILE_VENDOR,
    DELETE_PROFILE_VENDOR,
    GET_MOST_LIKED_BRANDS,} = require('../endPoints/endPoints');


app.post('/loginBrand',validator(loginBrandValidation), loginBrand);
app.post('/addBrand',[isAuthorized(ADD_VENDOR),validator(addBrandValidation)], addBrand);
app.get('/getBrand',[isAuthorized(GET_VENDOR)], getBrand);
app.get('/getBrandById/:id',[isAuthorized(GET_VENDOR_BY_ID)], getBrandById);
app.put('/updateBrand/:id',[isAuthorized(UPDATE_VENDOR),validator(updateBrandValidation)], updateBrand);
app.delete('/deleteBrand/:id',[isAuthorized(DELETE_VENDOR)], deleteBrand);
app.get('/getAllBrands',[isAuthorized(GET__ALL_VENDOR)], getAllBrands);
app.get('/getAllCategoriesByBrand/:id',[isAuthorized(GET_ALL_CATEGORY_BY_VENDOR)], getAllCategoriesByBrand);
app.get("/brandSearch",[isAuthorized(VENDOR_SEARCH)], brandSearch);
app.put('/updateProfileBrand',[isAuthorized(UPDATE_PROFILE_VENDOR),validator(updateBrandValidation)], updateProfileBrand);
app.delete('/deleteProfileBrand',[isAuthorized(DELETE_PROFILE_VENDOR)], deleteProfileBrand);
app.get('/getMostLikedBrands',[isAuthorized(GET_MOST_LIKED_BRANDS)], getMostLikedBrands);
app.get('/hashAllPassword', hashAllPassword);

module.exports = app;