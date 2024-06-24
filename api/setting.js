// setting.js
const Middleware = require('../middleware/jwt'); // Adjust the path to your Middleware
const upload = require('../upload-file/file-upload'); // Adjust the path to your upload configuration
const Banner = require('../models/Banner'); // Adjust the path to your Jackpot model
const HelpAndSupport = require('../models/HelpAndSupport'); // Adjust the path to your Jackpot model
const AboutUs = require('../models/AboutUs'); // Adjust the path to your Jackpot model
const RefundPolicy = require('../models/RefundPolicy'); // Adjust the path to your Jackpot model
const TermsAndCondetion = require('../models/TermsAndCondetion'); // Adjust the path to your Jackpot model
const { check, validationResult } = require('express-validator');

const banner = [
    upload.single('image'),
    Middleware.verifyToken,
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ errors: [{ msg: 'Image file is required' }] });
            }
            const { image } = req.body;
            let profileImagePath = req.file.filename;

            const banner = new Banner({
                image,
                profileImagePath
            });

            await banner.save();
            res.status(201).send({ message: 'Banner added successfully' });
        } catch (error) {
            res.status(400).send({ message: 'Error adding banner', error });
        }
    }
];
const deleteBanner = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('id').not().isEmpty().withMessage('id field is required').isMongoId().withMessage('Invalid id format')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
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

const helpAndSupport = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('text').not().isEmpty().withMessage('text field is required'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {text} = req.body;
            const helpAndSupport = new HelpAndSupport({text});
            await helpAndSupport.save();
            if (!text) {
                return res.status(404).send({ message: 'text not found' });
            }
            res.status(200).send({ message: 'Help And Support add successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error adding text', error });
        }
    }
];

const updateHelpAndSupport = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('id').not().isEmpty().withMessage('id field is required'),
        check('text').not().isEmpty().withMessage('text field is required'),
        
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {id,text} = req.body;
            const helpAndSupport = await HelpAndSupport.findByIdAndUpdate(id, { text },{ new: true, runValidators: true } // Options to return the updated document and run validators
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
const aboutUs = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('text').not().isEmpty().withMessage('text field is required'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {text} = req.body;
            const aboutUs = new AboutUs({text});
            await aboutUs.save();
            if (!text) {
                return res.status(404).send({ message: 'text not found' });
            }
            res.status(200).send({ message: 'About Us add successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error adding about us', error });
        }
    }
];

const updateAboutUs = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('id').not().isEmpty().withMessage('id field is required'),
        check('text').not().isEmpty().withMessage('text field is required'),
        
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {id,text} = req.body;
            const aboutUs = await AboutUs.findByIdAndUpdate(id, { text },{ new: true, runValidators: true } // Options to return the updated document and run validators
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
    [
        check('text').not().isEmpty().withMessage('text field is required'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {text} = req.body;
            const refundPolicy = new RefundPolicy({text});
            await refundPolicy.save();
            if (!text) {
                return res.status(404).send({ message: 'text not found' });
            }
            res.status(200).send({ message: 'Refund Policy add successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error adding Refund Policy', error });
        }
    }
];

const updateRefundPolicy = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('id').not().isEmpty().withMessage('id field is required'),
        check('text').not().isEmpty().withMessage('text field is required'),
        
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {id,text} = req.body;
            const refundPolicy = await RefundPolicy.findByIdAndUpdate(id, { text },{ new: true, runValidators: true } // Options to return the updated document and run validators
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

const termsAndCondetion = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('text').not().isEmpty().withMessage('text field is required'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {text} = req.body;
            const termsAndCondetion = new TermsAndCondetion({text});
            await termsAndCondetion.save();
            if (!text) {
                return res.status(404).send({ message: 'text not found' });
            }
            res.status(200).send({ message: 'Terms And Condetion add successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error adding Terms And Condetion', error });
        }
    }
];

const updatetermsAndCondetion = [
    upload.none(),
    Middleware.verifyToken,
    [
        check('id').not().isEmpty().withMessage('id field is required'),
        check('text').not().isEmpty().withMessage('text field is required'),
        
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {id,text} = req.body;
            const termsAndCondetion = await TermsAndCondetion.findByIdAndUpdate(id, { text },{ new: true, runValidators: true } // Options to return the updated document and run validators
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
    getBanner
};
