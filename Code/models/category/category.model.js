const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
})


const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;