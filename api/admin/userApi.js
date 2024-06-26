
const { check, validationResult } = require('express-validator');
const User = require('../../models/User'); // Adjust the path to your User model
const Middleware = require('../../middleware/jwt'); // Adjust the path to your Middleware
const upload = require('../../upload-file/file-upload'); // Adjust the path to your upload configuration

const addUser = [
    upload.single('profile'),
    Middleware.verifyToken,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(400).json({ errors: formattedErrors });
            }
            if (!req.file) {
                return res.status(400).json({ errors: [{ profile: 'profile file is required' }] });
            }
            const { name, number, aadhar_number, pan_number, dob } = req.body;
            const profileImagePath = req.file.filename;
            console.log('Uploaded file:', profileImagePath);
            const user = new User({name,profile: profileImagePath,number,aadhar_number,pan_number,dob
            });
            await user.save();
            res.status(200).send({ message: 'User added successfully' });
        } catch (error) {
            console.error('Error adding user:', error);
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
                profileImagePath: `${baseUrl}/uploads/images/${user.profile}`
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
