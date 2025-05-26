const moongose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
require('../Models/user');


const DBconnection = async () => {
    const moongose_url = process.env.MONGO_URI;
    try {
        await moongose.connect(moongose_url);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = {DBconnection};