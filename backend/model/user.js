const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : {type: "string", required: true},
    email : {type: "string", required: true},
    password : {type: "string", required: true},
    registrationDate : {type: "string", required: true},
    activationToken : {type: "string"},
    activate : {type: "boolean", required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;