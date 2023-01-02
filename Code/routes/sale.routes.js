const app = require('express').Router();
const { addSale, updateSale, deleteSale, getSaleById,
    getAllSales,SaleSearch,getMostLikedSales } = require('../controller/sale/sale.controller');
const { addSaleValidation, updateSaleValidation } = require('../validation/sale.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_SALE,
    GET_SALE_BY_ID,
    UPDATE_SALE,
    DELETE_SALE,
    GET_ALL_SALE,
    GET_MOST_LIKED_SALES,
    SALE_SEARCH,} = require('../endPoints/endPoints');


app.post('/addSale',[isAuthorized(ADD_SALE),validator(addSaleValidation)], addSale);
app.get('/getSaleById/:id',[isAuthorized(GET_SALE_BY_ID)], getSaleById);
app.put('/updateSale/:id', [isAuthorized(UPDATE_SALE),validator(updateSaleValidation)],updateSale);
app.delete('/deleteSale/:id',[isAuthorized(DELETE_SALE)], deleteSale);
app.get('/getAllSales',[isAuthorized(GET_ALL_SALE)], getAllSales);
app.get("/SaleSearch",[isAuthorized(SALE_SEARCH)], SaleSearch);
app.get('/getMostLikedSales',[isAuthorized(GET_MOST_LIKED_SALES)], getMostLikedSales);

module.exports = app;