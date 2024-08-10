const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notebook"

const connecttomongo = async()=>{
    mongoose.connect(mongoURI,
        console.log("connected to mongo")
    )
}

module.exports = connecttomongo;