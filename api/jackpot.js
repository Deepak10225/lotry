// jackpot.js
const { check, validationResult } = require('express-validator');
const Middleware = require('../middleware/jwt'); // Adjust the path to your Middleware
const upload = require('../upload-file/file-upload'); // Adjust the path to your upload configuration
const Jackpot = require('../models/Jackpot'); // Adjust the path to your Jackpot model

const jackpot = [
    upload.single('image'),
    Middleware.verifyToken,
    [
        check('name').not().isEmpty().withMessage('name field is required'),
        check('description').not().isEmpty().withMessage('description field is required'),
        check('starting_date').not().isEmpty().withMessage('starting date field is required'),
        check('prize_pool').not().isEmpty().withMessage('prize pool field is required'),
        check('join_count').not().isEmpty().withMessage('join count field is required'),
        check('prize').not().isEmpty().withMessage('prize field is required'),
        check('wining_amount').not().isEmpty().withMessage('wining amount field is required'),
        check('status').not().isEmpty().withMessage('status field is required')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, description, starting_date, prize_pool, join_count, prize, wining_amount, status } = req.body;
            let profileImagePath = req.file.filename;

            const jackpot = new Jackpot({
                name,
                image: profileImagePath,
                description,
                starting_date,
                prize_pool,
                join_count,
                prize,
                wining_amount,
                status
            });

            await jackpot.save();
            res.status(201).send({ message: 'Jackpot added successfully' });
        } catch (error) {
            res.status(400).send({ message: 'Error adding jackpot', error });
        }
    }
];

const getJackpots = [Middleware.verifyToken, async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const jackpots = await Jackpot.find();
        const modifiedUsers = jackpots.map(user => ({
            ...user.toJSON(),
            jackpot_image: `${baseUrl}/uploads/images/${user.profileImagePath}`
        }));

        res.status(200).send({ jackpots: modifiedUsers });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching jackpots', error });
    }
}
];

module.exports =
{
    jackpot,
    getJackpots
};
