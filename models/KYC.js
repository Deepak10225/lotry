const mongoose = require('mongoose');

const KYCSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    pan_no: { 
        type: String 
    },
    aadhar_no: { 
        type: String 
    },
    dob: { 
        type: String 
    },
    user_id: { 
        type: String 
    },
    status: { 
        type: String 
    }
});
const KYC = mongoose.model('KYC', KYCSchema);
module.exports = KYC;
