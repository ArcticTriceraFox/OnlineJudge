const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        default: null,
    },
    lastName: {
        type: String,
        required: true,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "master"],
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);