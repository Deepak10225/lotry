const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    profile: { type: String },
    profileImagePath: { type: String }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
