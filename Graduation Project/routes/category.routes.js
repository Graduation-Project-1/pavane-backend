const app = require('express').Router();
const { addCategory, updateCategory, deleteCategory, getCategoryById,
    getAllCategories, categorySearch } = require('../controller/category/category.controller');
const { addCategoryValidation, updateCategoryValidation } = require('../validation/category.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_CATEGORY,
    GET_CATEGORY_BY_ID,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    GET_ALL_CATEGORY,
    CATEGORY_SEARCH,} = require('../endPoints/endPoints');


app.post('/addCategory',[isAuthorized(ADD_CATEGORY),validator(addCategoryValidation)], addCategory);
app.get('/getCategoryById/:id',[isAuthorized(GET_CATEGORY_BY_ID)], getCategoryById);
app.put('/updateCategory/:id',[isAuthorized(UPDATE_CATEGORY),validator(updateCategoryValidation)], updateCategory);
app.delete('/deleteCategory/:id',[isAuthorized(DELETE_CATEGORY)], deleteCategory);
app.get('/getAllCategories',[isAuthorized(GET_ALL_CATEGORY)], getAllCategories);
app.get("/categorySearch",[isAuthorized(CATEGORY_SEARCH)], categorySearch);

module.exports = app;