const mongoose = require('mongoose');

const collectionReviewSchema = mongoose.Schema({
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
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
    },
    isArchived : {
        type : Boolean,
        default : false,
    },
})


const collectionReviewModel = mongoose.model('collectionReview', collectionReviewSchema);

module.exports = collectionReviewModel;