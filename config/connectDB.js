require('dotenv').config()
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectdb = async()=>{
    try {
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`successfully connected to ${MONGO_URI}`)
    }
    catch (error) {
        console.log('cannot connect '+ error)
    }
}

module.exports=connectdb