const mongoose = require('mongoose');

const TermsAndCondetionSchema = new mongoose.Schema({
    text: { 
        type: String 
    },
});
const TermsAndCondetion = mongoose.model('TermsAndCondetion', TermsAndCondetionSchema);
module.exports = TermsAndCondetion;
