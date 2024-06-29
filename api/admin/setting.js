// setting.js
const Middleware = require('../../middleware/jwt'); // Adjust the path to your Middleware
const upload = require('../../upload-file/file-upload'); // Adjust the path to your upload configuration
const Banner = require('../../models/Banner'); // Adjust the path to your Jackpot model
const HelpAndSupport = require('../../models/HelpAndSupport'); // Adjust the path to your Jackpot model
const AboutUs = require('../../models/AboutUs'); // Adjust the path to your Jackpot model
const RefundPolicy = require('../../models/RefundPolicy'); // Adjust the path to your Jackpot model
const TermsAndCondetion = require('../../models/TermsAndCondetion'); // Adjust the path to your Jackpot model
const { check, validationResult } = require('express-validator');
const { formatValidationErrors } = require('./validation-response/apiResponse');
const {settingValidation,updateSettingValidation} = require('../../helper/validation')

const banner = [upload.single('image'), Middleware.verifyToken, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ errors: { image: 'Image file is required' } });
        }
        const { image } = req.body;
        let profileImagePath = req.file.filename;
        const banner = new Banner({ image, profileImagePath });
        await banner.save();
        res.status(200).send({ message: 'Banner added successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error adding banner', error });
    }
}
];
const deleteBanner = [upload.none(), Middleware.verifyToken, [
    check('id').not().isEmpty().withMessage('id field is required').isMongoId().withMessage('Invalid id format')
],
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(400).json({ errors: formattedErrors });
        }
        const { id } = req.query;
        const banner = await Banner.findByIdAndDelete(id);

        if (!banner) {
            return res.status(404).send({ message: 'Banner not found' });
        }

        res.status(200).send({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting banner', error });
    }
}
];
const helpAndSupport = [upload.none(),Middleware.verifyToken,settingValidation,async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(400).json({ errors: formattedErrors });
            } 
            const { text } = req.body; 
            if (!text) {
                return res.status(400).send({ message: 'text not found' });
            }
            
            let helpAndSupport = await HelpAndSupport.findOne();
            
            if (helpAndSupport) {
                helpAndSupport.text = text;
                await helpAndSupport.save();
                res.status(200).send({ message: 'Help And Support updated successfully' });
            } else {
                helpAndSupport = new HelpAndSupport({ text });
                await helpAndSupport.save();
                res.status(200).send({ message: 'Help And Support added successfully' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error adding/updating text', error });
        }
    }
];


const updateHelpAndSupport = [upload.none(), Middleware.verifyToken,updateSettingValidation,
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(400).json({ errors: formattedErrors });
        }
        const { id, text } = req.body;
        const helpAndSupport = await HelpAndSupport.findByIdAndUpdate(id, { text }, { new: true, runValidators: true } // Options to return the updated document and run validators
        );
        if (!helpAndSupport) {
            return res.status(404).send({ message: 'id not found' });
        }

        res.status(200).send({ message: 'Help And Support update successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error update help and support', error });
    }
}
];
const aboutUs = [upload.none(),Middleware.verifyToken,settingValidation,async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(400).json({ errors: formattedErrors });
            }
            
            const { text } = req.body;
            
            if (!text) {
                return res.status(400).send({ message: 'Text not found' });
            }
            
            let aboutUs = await AboutUs.findOne();
            
            if (aboutUs) {
                aboutUs.text = text;
                await aboutUs.save();
                res.status(200).send({ message: 'About Us updated successfully' });
            } else {
                aboutUs = new AboutUs({ text });
                await aboutUs.save();
                res.status(200).send({ message: 'About Us added successfully' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error adding or updating About Us', error });
        }
    }
];


const updateAboutUs = [upload.none(), Middleware.verifyToken,updateSettingValidation,
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(400).json({ errors: formattedErrors });
        }
        const { id, text } = req.body;
        const aboutUs = await AboutUs.findByIdAndUpdate(id, { text }, { new: true, runValidators: true } // Options to return the updated document and run validators
        );
        if (!aboutUs) {
            return res.status(404).send({ message: 'id not found' });
        }

        res.status(200).send({ message: 'About Us update successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error update About Us', error });
    }
}
];

const refundPolicy = [
    upload.none(),
    Middleware.verifyToken,
    settingValidation,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = formatValidationErrors(errors);
                return res.status(400).json({ errors: formattedErrors });
            }
            
            const { text } = req.body;
            
            if (!text) {
                return res.status(400).send({ message: 'Text not found' });
            }
            
            let refundPolicy = await RefundPolicy.findOne();
            
            if (refundPolicy) {
                // Update the existing text
                refundPolicy.text = text;
                await refundPolicy.save();
                res.status(200).send({ message: 'Refund Policy updated successfully' });
            } else {
                // Create a new entry
                refundPolicy = new RefundPolicy({ text });
                await refundPolicy.save();
                res.status(200).send({ message: 'Refund Policy added successfully' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error adding or updating Refund Policy', error });
        }
    }
];


const updateRefundPolicy = [upload.none(), Middleware.verifyToken,updateSettingValidation,
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(400).json({ errors: formattedErrors });
        }
        const { id, text } = req.body;
        const refundPolicy = await RefundPolicy.findByIdAndUpdate(id, { text }, { new: true, runValidators: true } // Options to return the updated document and run validators
        );
        if (!refundPolicy) {
            return res.status(404).send({ message: 'id not found' });
        }

        res.status(200).send({ message: 'Refund Policy update successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error update Refund Policy', error });
    }
}
];

const termsAndCondetion = [upload.none(),Middleware.verifyToken,settingValidation,async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = errors.array().reduce((acc, err) => {
                    acc[err.path] = err.msg;
                    return acc;
                }, {});
                return res.status(400).json({
                    errors: formattedErrors,
                });
            }

            const { text } = req.body;

            if (!text) {
                return res.status(400).send({ message: 'Text not found' });
            }

            let termsAndCondition = await TermsAndCondetion.findOne();
            
            if (termsAndCondition) {
                // Update the existing text
                termsAndCondition.text = text;
                await termsAndCondition.save();
                res.status(200).send({ message: 'Terms and Conditions updated successfully' });
            } else {
                // Create a new entry
                termsAndCondition = new TermsAndCondetion({ text });
                await termsAndCondition.save();
                res.status(200).send({ message: 'Terms and Conditions added successfully' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error adding or updating Terms and Conditions', error });
        }
    }
];


const updatetermsAndCondetion = [upload.none(), Middleware.verifyToken, [
    check('id').not().isEmpty().withMessage('id field is required'),
    check('text').not().isEmpty().withMessage('text field is required'),

],
async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(400).json({ errors: formattedErrors });
        }
        const { id, text } = req.body;
        const termsAndCondetion = await TermsAndCondetion.findByIdAndUpdate(id, { text }, { new: true, runValidators: true } // Options to return the updated document and run validators
        );
        if (!termsAndCondetion) {
            return res.status(404).send({ message: 'id not found' });
        }

        res.status(200).send({ message: 'Terms And Condetion update successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error update Terms And Condetion', error });
    }
}
];

const getBanner = [Middleware.verifyToken, async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const banner = await Banner.find();
        const modifiedBanners = banner.map(banner => {
            const { _id, profileImagePath, ...rest } = banner.toJSON();
            return {
                id: _id,
                banner_image: `${baseUrl}/uploads/images/${banner.profileImagePath}`,

            };
        });
        res.status(200).send({ banners: modifiedBanners });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching jackpots', error });
    }
}
];
const helpAndSuport = [Middleware.verifyToken, async (req, res) => {
    try {
        const help_and_support = await HelpAndSupport.find();
        const modifiedBanners = help_and_support.map(has => {
            const { _id, text, ...rest } = has.toJSON();
            return {
                id: _id,
                text,
            };
        });
        res.status(200).send({ help_and_support: modifiedBanners });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching help and support', error });
    }
}
];
const getAboutUs = [Middleware.verifyToken, async (req, res) => {
    try {
        const about_us = await AboutUs.find();
        const modifiedBanners = about_us.map(has => {
            const { _id, text, ...rest } = has.toJSON();
            return {
                id: _id,
                text,
            };
        });
        res.status(200).send({ about_us: modifiedBanners });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching about us', error });
    }
}
];
const getRefundPolicy = [Middleware.verifyToken, async (req, res) => {
    try {
        const refund_policy = await RefundPolicy.find();
        const modifiedBanners = refund_policy.map(has => {
            const { _id, text, ...rest } = has.toJSON();
            return {
                id: _id,
                text,
            };
        });
        res.status(200).send({ refund_policy: modifiedBanners });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching about us', error });
    }
}
];
const getTermsAndCondetion = [Middleware.verifyToken, async (req, res) => {
    try {
        const terms_and_conditions = await TermsAndCondetion.find();
        const modifiedBanners = terms_and_conditions.map(has => {
            const { _id, text, ...rest } = has.toJSON();
            return {
                id: _id,
                text,
            };
        });
        res.status(200).send({ terms_and_conditions: modifiedBanners });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching about us', error });
    }
}
];

module.exports =
{
    banner,
    deleteBanner,
    helpAndSupport,
    updateHelpAndSupport,
    aboutUs,
    updateAboutUs,
    refundPolicy,
    updateRefundPolicy,
    termsAndCondetion,
    updatetermsAndCondetion,
    getBanner,
    helpAndSuport,
    getAboutUs,
    getRefundPolicy,
    getTermsAndCondetion
};
