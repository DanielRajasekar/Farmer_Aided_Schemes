const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true }, // userId will be generated from email
    role: { type: String, default: 'user' } // Add role field
});


module.exports = mongoose.model('User ', userSchema); // Removed extra space in 'User '