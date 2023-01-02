const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    startDate: {
        type: Date,
        default : Date.now,
    },
    endDate: {
        type: Date,
        required : true,
    },
    creatorName: {
        type: String,
        required: true,
    },
})


const advertisementModel = mongoose.model('advertisement', advertisementSchema);

module.exports = advertisementModel;