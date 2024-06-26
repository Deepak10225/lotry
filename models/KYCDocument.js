const mongoose = require('mongoose');

const KYCDocumentSchema = new mongoose.Schema({
   
    pan_img: { 
        type: String 
    },
    aadhar_img: { 
        type: String 
    },
    user_id: { 
        type: String 
    }
});
const KYCDocument = mongoose.model('KYCDocument', KYCDocumentSchema);
module.exports = KYCDocument;
