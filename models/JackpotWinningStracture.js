const mongoose = require('mongoose');

const JackpotWinningStractureSchema = new mongoose.Schema({
        first_place: { 
            type: String, 
            required: true,
        },
        second_place: { 
            type: String, 
            required: true,
        },
        third_place: { 
            type: String, 
            required: true,
        },
        fourth_place: { 
            type: String, 
            required: true,
        },
        fifth_place: { 
            type: String, 
            required: true,
        },
        sixth_to_tenth_place: { 
            type: String, 
            required: true,
        },
        eleventh_to_twenty_place: { 
            type: String, 
            required: true,
        },
        twenty_one_to_thirty_place: { 
            type: String, 
            required: true,
        },
        thirty_one_to_forty_place: { 
            type: String, 
            required: true,
        },
        forty_one_to_fifty_place: { 
            type: String, 
            required: true,
        },
        fifty_one_to_one_hundred_place: { 
            type: String, 
            required: true,
        },
        one_hundred_one_to_five_hundred_place: { 
            type: String, 
            required: true,
        },
        five_hundred_one_to_thousand_place: { 
            type: String, 
            required: true,
        },
        one_thousand_one_to_two_thousand_place: { 
            type: String, 
            required: true,
        },
        two_thousand_one_to_three_thousand_place: { 
            type: String, 
            required: true,
        },
        three_thousand_one_to_four_thousand_place: { 
            type: String, 
            required: true,
        },
        four_thousand_one_to_five_thousand_place: { 
            type: String, 
            required: true,
        },
        user_id: { 
            type: String,
        },
    });
    
const JackpotWinningStracture = mongoose.model('JackpotWinningStracture', JackpotWinningStractureSchema);
module.exports = JackpotWinningStracture;
