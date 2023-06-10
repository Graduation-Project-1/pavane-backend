const mongoose = require('mongoose');

const brandReviewSchema = mongoose.Schema({
    comment: {
        type: String,
    },
    rate: {
        type: Number,
    },
    date: {
        type: Date,
        default : Date.now,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    },
    isArchived : {
        type : Boolean,
        default : false,
    },
})


const brandReviewModel = mongoose.model('brandReview', brandReviewSchema);

module.exports = brandReviewModel;