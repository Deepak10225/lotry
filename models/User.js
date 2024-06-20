const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name field is required'],
        validate: {
            validator: (value) => {
                return value.length >= 3;
            },
            message: 'Name must be at least 3 characters long'
        }
    },
    number: { 
        type: String, 
        required: [true, 'Number field is required'] 
    },
    profile: { 
        type: String 
    },
    profileImagePath: { 
        type: String 
    }
});
UserSchema.post('/api/get-user', function(error, doc, next) {
    if (error.errors) {
        const errors = {};
        for (let key in error.errors) {
            errors[key] = error.errors[key].message;
        }
        next(new Error(JSON.stringify(errors)));
    } else {
        next();
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
