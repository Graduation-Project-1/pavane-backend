const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    season: {
        type: String,
    },
    date: {
        type: Date,
    },
    image: {
        type: String,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    averageRate: {
        type: Number,
        default: 0,
    },
    discountRate: {
        type: Number,
        default: 0,
    },
    itemsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    }],
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    }],
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    },
})


const collectionModel = mongoose.model('collection', collectionSchema);

module.exports = collectionModel;