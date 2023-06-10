const app = require('express').Router();
const { addItem, updateItem, deleteItem, getItemById,getAllItems 
    ,getAllItemsByBrand,getAllItemsByCategory,getAllItemsByCollection,
     getAllItemsWithFilter,itemSearch,addOffer,getAllOffer, getMostLikedItems,getAllBrandItems, archiveItem, disArchiveItem} = require('../controller/item/item.controller');
const { addItemValidation, updateItemValidation,addOfferValidation } = require('../validation/item.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_PRODUCT,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_ALL_PRODUCT,
    GET_ALL_PRODUCT_BY_VENDOR,
    GET_ALL_PRODUCT_BY_CATEGORY,
    GET_ALL_PRODUCT_BY_COLLECTION,
    GET_ALL_PRODUCT_WITH_FILTER,
    PRODUCT_SEARCH,
    ADD_OFFER,
    GET_ALL_OFFER,
    GET_MOST_LIKED_ITEMS,
    GET_ALL_BRAND_ITEMS,
    ARCHIVE_PRODUCT,
    DISARCHIVE_PRODUCT,} = require('../endPoints/endPoints');


app.post('/addItem',[isAuthorized(ADD_PRODUCT),validator(addItemValidation)],addItem);
app.get('/getItemById/:id',[isAuthorized(GET_PRODUCT_BY_ID)], getItemById);
app.put('/updateItem/:id', [isAuthorized(UPDATE_PRODUCT),validator(updateItemValidation)], updateItem);
app.delete('/deleteItem/:id',[isAuthorized(DELETE_PRODUCT)], deleteItem);
app.get('/getAllItems',[isAuthorized(GET_ALL_PRODUCT)], getAllItems);
app.get('/getAllItemsByBrand/:id',[isAuthorized(GET_ALL_PRODUCT_BY_VENDOR)], getAllItemsByBrand);
app.get('/getAllItemsByCategory/:id', [isAuthorized(GET_ALL_PRODUCT_BY_CATEGORY)],getAllItemsByCategory);
app.get('/getAllItemsByCollection/:id',[isAuthorized(GET_ALL_PRODUCT_BY_COLLECTION)], getAllItemsByCollection);
app.get('/getAllItemsWithFilter',[isAuthorized(GET_ALL_PRODUCT_WITH_FILTER)], getAllItemsWithFilter);
app.get("/itemSearch",[isAuthorized(PRODUCT_SEARCH)], itemSearch);
app.put('/addOffer/:id',[isAuthorized(ADD_OFFER),validator(addOfferValidation)],addOffer);
app.get('/getAllOffer',[isAuthorized(GET_ALL_OFFER)], getAllOffer);
app.get('/getMostLikedItems',[isAuthorized(GET_MOST_LIKED_ITEMS)], getMostLikedItems);
app.get('/getAllBrandItems',[isAuthorized(GET_ALL_BRAND_ITEMS)], getAllBrandItems);
app.put('/archiveItem/:id',[isAuthorized(ARCHIVE_PRODUCT)], archiveItem);
app.put('/disArchiveItem/:id',[isAuthorized(DISARCHIVE_PRODUCT)], disArchiveItem);

module.exports = app;