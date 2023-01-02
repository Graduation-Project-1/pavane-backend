const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required : true,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
    },
    referralLink: {
        type: String,
    },
    accountType: {
        type: String,
        default : "standard",
    },
    cardNumber: { 
        type : Array ,
        default : [], 
    },
    referralLinkUsage: {
        type: Number,
        default: 0,
    },
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    }],
    likedBrands: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    }],
    likedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    }],
    likedCollections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
    }],
    role : {
        type : String,
        required : true,
    },
})


const customerModel = mongoose.model('customer', customerSchema);

module.exports = customerModel;