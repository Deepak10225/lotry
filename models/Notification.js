const mongoose = require('mongoose');

const NotficationSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
       
    },
    description: { 
        type: String, 
        required: true
    },
   
});
const Notfication = mongoose.model('Notfication', NotficationSchema);
module.exports = Notfication;
