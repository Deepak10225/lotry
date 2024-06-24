const mongoose = require('mongoose');

const HelpAndSupportSchema = new mongoose.Schema({
    text: { 
        type: String 
    },
});
const HelpAndSupport = mongoose.model('HelpAndSupport', HelpAndSupportSchema);
module.exports = HelpAndSupport;
