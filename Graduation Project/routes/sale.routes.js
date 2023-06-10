const app = require('express').Router();
const { addSale, updateSale, deleteSale, getSaleById,
    getAllSales,SaleSearch,getMostLikedSales,archiveSale,disArchiveSale } = require('../controller/sale/sale.controller');
const { addSaleValidation, updateSaleValidation,archiveSaleValidation } = require('../validation/sale.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_SALE,
    GET_SALE_BY_ID,
    UPDATE_SALE,
    DELETE_SALE,
    GET_ALL_SALE,
    GET_MOST_LIKED_SALES,
    SALE_SEARCH,
    ARCHIVE_SALE,
    DISARCHIVE_SALE,} = require('../endPoints/endPoints');


app.post('/addSale',[isAuthorized(ADD_SALE),validator(addSaleValidation)], addSale);
app.get('/getSaleById/:id',[isAuthorized(GET_SALE_BY_ID)], getSaleById);
app.put('/updateSale/:id', [isAuthorized(UPDATE_SALE),validator(updateSaleValidation)],updateSale);
app.delete('/deleteSale/:id',[isAuthorized(DELETE_SALE)], deleteSale);
app.get('/getAllSales',[isAuthorized(GET_ALL_SALE)], getAllSales);
app.get("/SaleSearch",[isAuthorized(SALE_SEARCH)], SaleSearch);
app.get('/getMostLikedSales',[isAuthorized(GET_MOST_LIKED_SALES)], getMostLikedSales);
app.put('/archiveSale/:id', [isAuthorized(ARCHIVE_SALE),validator(archiveSaleValidation)],archiveSale);
app.put('/disArchiveSale/:id', [isAuthorized(DISARCHIVE_SALE)],disArchiveSale);

module.exports = app;