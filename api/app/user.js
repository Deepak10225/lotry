
const User = require('../../models/User');
const upload = require('../../upload-file/file-upload');
const Middleware = require('../../middleware/jwt');
const { validationResult } = require('express-validator');
const { formatValidationErrors } = require('./validation-response/apiResponse');
const { numberValidation,verifyOtp,signupValidation } = require('../../helper/validation');

const checkNumber = [
    upload.none(), numberValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(422).json({ errors: formattedErrors });
        }

        const { number } = req.body;
        const otp = 1234;
        try {
            const user = await User.findOne({ number });
            if (!user) {
                return res.status(200).json({ status: 'false', otp });
            } else {
                const token = Middleware.jwt.sign({ _id: user._id }, Middleware.jwtSecret, { expiresIn: '1h' });
                return res.json({ token });
            }
        } catch (err) {
            console.error('Error during login', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
];

const verifyOTP = [
    upload.none(),verifyOtp,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(422).json({ errors: formattedErrors });
        }
        const { number, otp } = req.body;
        try {
            const user = await User.findOne({ number });
            if (!user) {
                if (otp == '1234') {
                    return res.status(200).json({ "message": "Verification successfully" });
                } else {
                    return res.status(400).json({ "otp": "Incorrect Verification Code" });
                }
            }
        } catch (err) {
            console.error('Error during login', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
];
const signup = [
    upload.single('profile'),signupValidation,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(422).json({ errors: formattedErrors });
            }
            if (!req.file) {
                return res.status(422).json({ errors: [{ profile: 'profile file is required' }] });
            }
            const { name, number, aadhar_number, pan_number, dob } = req.body;
            const profileImagePath = req.file.filename;
            console.log('Uploaded file:', profileImagePath);
            const user = new User({name,profile: profileImagePath,number,aadhar_number,pan_number,dob
            });
             const id = await user.save();
             console.log(id._id);
            const auth_key  = Middleware.jwt.sign({ _id: id._id }, Middleware.jwtSecret);
            res.status(200).send({data:{ message: 'Signup successfully',auth_key }});
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(400).send({ message: 'Error adding user', error });
        }
    }
];




module.exports = { checkNumber, verifyOTP,signup };