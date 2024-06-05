const mongoose = require('mongoose');

const sessiosSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sesionId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
});

const Session = mongoose.model('Session',sessiosSchema);

module.exports = Session;