const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    discountRate: {
        type: Number,
        required: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
})


const offerModel = mongoose.model('offer', offerSchema);

module.exports = offerModel;