const Middleware = require('../../middleware/jwt'); // Adjust the path to your Middleware
const User = require('../../models/User');
const { formatValidationErrors } = require('./validation-response/apiResponse');
const {updateProfileValidation} = require('../../helper/validation');
const upload = require('../../upload-file/file-upload');
const { check, validationResult } = require('express-validator');

const getProfile = [Middleware.verifyToken, async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const users = await User.find({_id:req.user});
        const modifiedBanners = users.map(user => {
            const { _id, name,number,profile, ...rest } = user.toJSON();
            return {
                id: _id,
                name:name,
                number:number,
            profile: `${baseUrl}/uploads/images/${user.profile}`,
            };
        });
        res.status(200).send({ users: modifiedBanners });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
}
];

const updateProfile = [Middleware.verifyToken,upload.single('profile'),updateProfileValidation,async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(422).json({ errors: formattedErrors });
            }
            const userId = req.user;
            const { name } = req.body;
            let updateData = { name };

            if (req.file) {
                const profileImagePath = req.file.filename;
                updateData.profile = profileImagePath;
            }

            const updatedUser = await User.findByIdAndUpdate(userId,updateData,{ new: true });

            if (!updatedUser) {
                return res.status(404).send({ message: 'User not found' });
            }

            res.status(200).send({'message':'profile update successfully'});
        } catch (error) {
            res.status(500).send({ message: 'Error updating user profile', error });
        }
    }
];

module.exports = {
    getProfile,
    updateProfile
}