const mongoose = require('mongoose');

const JackpotSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
       
    },
    description: { 
        type: String, 
        required: true
    },
    image: { 
        type: String 
    },
    profileImagePath: { 
        type: String 
    },
    starting_date: { 
        type: String, 
        required: true,
       
    }, prize_pool: { 
        type: String, 
        required: true,
       
    }, join_count: { 
        type: String, 
        required: true,
       
    }, prize: { 
        type: String, 
        required: true,
       
    }, wining_amount: { 
        type: String, 
        required: true,
       
    }, status: { 
        type: String, 
        required: true,
       
    },
});
const Jackpot = mongoose.model('Jackpot', JackpotSchema);
module.exports = Jackpot;
