const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    image: {
        type: String,
    },
    numberOfLikes: {
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
    isArchived : {
        type : Boolean,
        default : false,
    },
})


const saleModel = mongoose.model('sale', saleSchema);

module.exports = saleModel;