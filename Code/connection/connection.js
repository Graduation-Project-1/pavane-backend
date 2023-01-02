const mongoose = require('mongoose');

const connect =()=>{
    return mongoose.connect(process.env.CONNECTION_STRING_DEPLOY, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log("Mongo is connected");
    })
}

module.exports = connect;