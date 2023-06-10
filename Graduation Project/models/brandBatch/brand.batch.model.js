const mongoose = require('mongoose');

const brandBatchSchema = mongoose.Schema({
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    },
    itemList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    }],
    collectionList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
    }],
})


const brandBatchModel = mongoose.model('brandBatch', brandBatchSchema);

module.exports = brandBatchModel;