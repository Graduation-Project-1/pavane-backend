const app = require('express').Router();
const { addCollection, updateCollection, deleteCollection, getCollectionById,
    getAllCollections,collectionSearch,getMostLikedCollections,getAllBrandCollections, archiveCollection, 
    disArchiveCollection } = require('../controller/collection/collection.controller');
const { addCollectionValidation, updateCollectionValidation ,archiveCollectionValidation } = require('../validation/collection.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_COLLECTION,
    GET_COLLECTION_BY_ID,
    UPDATE_COLLECTION,
    DELETE_COLLECTION,
    GET_ALL_COLLECTION,
    COLLECTION_SEARCH,
    GET_MOST_LIKED_COLLECTIONS,
    GET_ALL_Brand_COLLECTION,
    ARCHIVE_COLLECTION,
    DISARCHIVE_COLLECTION,} = require('../endPoints/endPoints');


app.post('/addCollection',[isAuthorized(ADD_COLLECTION),validator(addCollectionValidation)], addCollection);
app.get('/getCollectionById/:id',[isAuthorized(GET_COLLECTION_BY_ID)], getCollectionById);
app.put('/updateCollection/:id', [isAuthorized(UPDATE_COLLECTION),validator(updateCollectionValidation)],updateCollection);
app.delete('/deleteCollection/:id',[isAuthorized(DELETE_COLLECTION)], deleteCollection);
app.get('/getAllCollections',[isAuthorized(GET_ALL_COLLECTION)], getAllCollections);
app.get("/collectionSearch",[isAuthorized(COLLECTION_SEARCH)], collectionSearch);
app.get('/getMostLikedCollections',[isAuthorized(GET_MOST_LIKED_COLLECTIONS)], getMostLikedCollections);
app.get('/getAllBrandCollections',[isAuthorized(GET_ALL_Brand_COLLECTION)], getAllBrandCollections);
app.put('/archiveCollection/:id', [isAuthorized(ARCHIVE_COLLECTION),validator(archiveCollectionValidation)],archiveCollection);
app.put('/disArchiveCollection/:id', [isAuthorized(DISARCHIVE_COLLECTION)],disArchiveCollection);

module.exports = app;