// const app = require('express').Router();
// const { addOffer, updateOffer, deleteOffer, getOfferById,getAllOffers,
//     getAllOffersByVendor,getAllOffersByCategory,getAllOffersByVendorCategory } = require('../controller/offer/offer.controller');
// const { addOfferValidation, updateOfferValidation } = require('../validation/offer.validation');
// const validator = require('../helper/validator/common.validate');
// const isAuthorized = require("../helper/isAuthorized/isAuthorized");
// const {
//     ADD_OFFER,
//     GET_OFFER_BY_ID,
//     UPDATE_OFFER,
//     DELETE_OFFER,
//     GET_ALL_OFFER,
//     GET_ALL_OFFER_BY_VENDOR,
//     GET_ALL_OFFER_BY_CATEGORY,
//     GET_ALL_PRODUCT_BY_VENDOR_CATEGORY,} = require('../endPoints/endPoints');


// app.post('/addOffer',[isAuthorized(ADD_OFFER),validator(addOfferValidation)], addOffer);
// app.get('/getOfferById/:id',[isAuthorized(GET_OFFER_BY_ID)], getOfferById);
// app.put('/updateOffer/:id', [isAuthorized(UPDATE_OFFER),validator(updateOfferValidation)], updateOffer);
// app.delete('/deleteOffer/:id',[isAuthorized(DELETE_OFFER)], deleteOffer);
// app.get('/getAllOffers',[isAuthorized(GET_ALL_OFFER)], getAllOffers);
// app.get('/getAllOffersByVendor/:id',[isAuthorized(GET_ALL_OFFER_BY_VENDOR)], getAllOffersByVendor);
// app.get('/getAllOffersByCategory/:id',[isAuthorized(GET_ALL_OFFER_BY_CATEGORY)], getAllOffersByCategory);
// app.get('/getAllOffersByVendorCategory/:vendorId/:categoryId',[isAuthorized(GET_ALL_PRODUCT_BY_VENDOR_CATEGORY)], getAllOffersByVendorCategory);



// module.exports = app;