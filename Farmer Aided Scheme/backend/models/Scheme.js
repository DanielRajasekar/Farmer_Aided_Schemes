const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    schemeId:{
        type: String,
        required: true,
         unique: true 
        },

    description: {
        type: String,
        required: true,
    },
    eligibility: {
        type:String,
        required: true,
    }
    
});

module.exports = mongoose.model('Scheme ', userSchema);