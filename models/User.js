const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    number: { 
        type: String, 
        required:true 
    },
    profile: { 
        type: String 
    },
    profileImagePath: { 
        type: String 
    },
    pan_number: { 
        type: String 
    },
    aadhar_number: { 
        type: String 
    },
    dob: { 
        type: String 
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
