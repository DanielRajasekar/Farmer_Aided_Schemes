const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true,
    },
    cropType: {
        type: String,
        required: true,
    },
    season: {
        type:String,
        required: true,
    },
    notes: {
        type: String,
        default: '',
    },
    
});

module.exports = mongoose.model('Crop', userSchema);