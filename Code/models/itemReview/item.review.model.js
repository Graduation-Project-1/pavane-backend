const mongoose = require('mongoose');

const itemReviewSchema = mongoose.Schema({
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
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    },
})


const itemReviewModel = mongoose.model('itemReview', itemReviewSchema);

module.exports = itemReviewModel;