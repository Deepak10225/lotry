const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
    text: { 
        type: String 
    },
});
const AboutUs = mongoose.model('AboutUs', AboutUsSchema);
module.exports = AboutUs;
