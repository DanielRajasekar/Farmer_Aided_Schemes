const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Make this required if necessary
    },
    schemeId: {
        type: String,
        required: true, // Consider making this required
    },
    userId: {
        type: String,
        required: true, // Consider making this required
    },
    username: {
        type: String,
        required: true, // Consider making this required
    },
    description: {
        type: String,
        required: true, // Make this required if necessary
    },
    status: {
        type: String,
        default: "Pending" // Default status for applications
    }
});


module.exports = mongoose.model('Application', userSchema);