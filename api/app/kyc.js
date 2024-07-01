const Middleware = require('../../middleware/jwt');
const { formatValidationErrors } = require('./validation-response/apiResponse');
const { updateKycValidation } = require('../../helper/validation');
const upload = require('../../upload-file/file-upload');
const { check, validationResult } = require('express-validator');
const KYC = require('../../models/KYC');
const KYCDocument = require('../../models/KYCDocument');

const kycVerification = [upload.none(), Middleware.verifyToken, updateKycValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(422).json({ errors: formattedErrors });
        }
        const {name,aadhar_no,pan_no,dob} = req.body;
        const user_id = req.user;
        const status = 0;
        const matchKYC = KYC.find({user_id});
        if (matchKYC) {
        res.status(200).json({'message':'KYC details already uploaded'});
        }
        const kyc = new KYC({name,aadhar_no,pan_no,dob,user_id,status});
        await kyc.save();
        res.status(200).json({'message':'KYC details submitted successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Error varification KYC', error });

   }
}
];
const uploadKyc = [upload.fields([{ name: 'pan_img', maxCount: 1 },{ name: 'aadhar_img', maxCount: 1 }]),
    Middleware.verifyToken,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(422).json({ errors: formattedErrors });
            }

            if (!req.files || !req.files.pan_img || !req.files.aadhar_img) {
                return res.status(422).json({ message: 'PAN and Aadhar images are required' });
            }

            const pan_img = req.files.pan_img[0].filename;
            const aadhar_img = req.files.aadhar_img[0].filename;
            const user_id = req.user;
            const matchKYC = KYC.find({user_id});
        if (matchKYC) {
        res.status(200).json({'message':'KYC details already uploaded'});
        }
            const kyc = new KYCDocument({ aadhar_img, pan_img, user_id });
            await kyc.save();

            res.status(200).json({ message: 'PAN and Aadhar images uploaded successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error verifying KYC', error });
        }
    }
];


module.exports = {
    kycVerification,
    uploadKyc
}