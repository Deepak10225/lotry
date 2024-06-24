const mongoose = require('mongoose');

const RefundPolicySchema = new mongoose.Schema({
    text: { 
        type: String 
    },
});
const RefundPolicy = mongoose.model('RefundPolicy', RefundPolicySchema);
module.exports = RefundPolicy;
