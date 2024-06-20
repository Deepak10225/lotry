
const { check, validationResult } = require('express-validator');
const User = require('../models/User'); // Adjust the path to your User model
const Middleware = require('../middleware/jwt'); // Adjust the path to your Middleware
const upload = require('../upload-file/file-upload'); // Adjust the path to your upload configuration

const addUser = [
    Middleware.verifyToken,
    upload.single('profile'),
    check('name').not().isEmpty().withMessage('name field is required'),
    check('number').not().isEmpty().withMessage('number field is required'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, number } = req.body;
            let profileImagePath = req.file.filename;

            const user = new User({ name, number, profileImagePath });

            await user.save();
            res.status(201).send({ message: 'User added successfully' });
        } catch (error) {
            res.status(400).send({ message: 'Error adding user', error });
        }
    }
];

const getUser = [
    Middleware.verifyToken,
    async (req, res) => {
        try {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const users = await User.find();
            const modifiedUsers = users.map(user => ({
                ...user.toJSON(),
                profileImagePath: `${baseUrl}/uploads/images/${user.profileImagePath}`
            }));

            res.status(200).send({ users: modifiedUsers });
        } catch (error) {
            res.status(500).send({ message: 'Error fetching users', error });
        }
    }
];

module.exports = {
    getUser,
    addUser
}
