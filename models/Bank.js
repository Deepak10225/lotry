const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    account_no: { 
        type: String 
    },
    ifsc_code: { 
        type: String 
    },
    bank_name : { 
        type: String 
    },
    bank_branch : { 
        type: String 
    },
});
const Bank = mongoose.model('Bank', BankSchema);
module.exports = Bank;
