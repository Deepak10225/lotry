// jackpot.js
const { check, validationResult } = require('express-validator');
const Middleware = require('../../middleware/jwt'); // Adjust the path to your Middleware
const upload = require('../../upload-file/file-upload'); // Adjust the path to your upload configuration
const Jackpot = require('../../models/Jackpot'); // Adjust the path to your Jackpot model
const { jackpotValidation } = require('../../helper/validation')
const { formatValidationErrors } = require('./validation-response/apiResponse');
const JackpotWinningStracture = require('../../models/JackpotWinningStracture');

const jackpot = [
    upload.single('image'),
    Middleware.verifyToken, jackpotValidation,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(400).json({ errors: formattedErrors });
            }
            if (!req.file) {
                return res.status(400).json({ errors: [{ msg: 'Image file is required' }] });
            }
            const { name, description, starting_date, prize_pool, join_count, prize, wining_amount, status } = req.body;
            let profileImagePath = req.file.filename;

            const jackpot = new Jackpot({
                name, image: profileImagePath, description, starting_date, prize_pool, join_count, prize, wining_amount, status, profileImagePath
            });

            const id = await jackpot.save();
            const { first_place, second_place, third_place, fourth_place, fifth_place, sixth_to_tenth_place, eleventh_to_twenty_place, twenty_one_to_thirty_place, thirty_one_to_forty_place, forty_one_to_fifty_place, fifty_one_to_one_hundred_place, one_hundred_one_to_five_hundred_place, five_hundred_one_to_thousand_place, one_thousand_one_to_two_thousand_place, two_thousand_one_to_three_thousand_place, three_thousand_one_to_four_thousand_place, four_thousand_one_to_five_thousand_place } = req.body;
            const jackpotWinStratgy = new JackpotWinningStracture({ first_place, second_place, third_place, fourth_place, fifth_place, sixth_to_tenth_place, eleventh_to_twenty_place, twenty_one_to_thirty_place, thirty_one_to_forty_place, forty_one_to_fifty_place, fifty_one_to_one_hundred_place, one_hundred_one_to_five_hundred_place, five_hundred_one_to_thousand_place, one_thousand_one_to_two_thousand_place, two_thousand_one_to_three_thousand_place, three_thousand_one_to_four_thousand_place, four_thousand_one_to_five_thousand_place,user_id:id._id })
             await jackpotWinStratgy.save();
            res.status(200).send({ message: 'Jackpot added successfully' });
        } catch (error) {
            res.status(400).send({ message: 'Error adding jackpot', error });
        }
    }
];

const getJackpots = [Middleware.verifyToken, async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const jackpots = await Jackpot.find();
        const modifiedJackpot = jackpots.map(data => {
            const { _id, name,description,starting_date,prize_pool,join_count,wining_amount,profileImagePath, ...rest } = data.toJSON();
            return {
                id: _id,
                name:name,
                description:description,
                starting_date:starting_date,
                prize_pool:prize_pool,
                join_count:join_count,
                wining_amount:wining_amount,
                jackpot_image: `${baseUrl}/uploads/images/${profileImagePath}`
            };
        });
        res.status(200).send({ jackpots: modifiedJackpot });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching jackpots', error });
    }
}
];

const deleteJackpots = [Middleware.verifyToken,async (req, res) => {
      try {
        const { id } = req.query;
        const jackpot = await Jackpot.findByIdAndDelete(id);
        if (!jackpot) {
          return res.status(404).send({ message: 'jackpot record not found' });
        }
  
        res.status(200).send({ message: 'Jackpot  deleted successfully' });
      } catch (error) {
        res.status(500).send({ message: 'Error deleting jackpot ', error });
      }
    }
]

module.exports =
{
    jackpot,
    getJackpots,
    deleteJackpots
};
