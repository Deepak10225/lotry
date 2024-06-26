const {check} = require('express-validator');
exports.jackpotValidation = [
    check('name').not().isEmpty().withMessage('name field is required'),
    check('description').not().isEmpty().withMessage('description field is required'),
    check('starting_date').not().isEmpty().withMessage('starting date field is required'),
    check('prize_pool').not().isEmpty().withMessage('prize pool field is required'),
    check('join_count').not().isEmpty().withMessage('join count field is required'),
    check('prize').not().isEmpty().withMessage('prize field is required'),
    check('wining_amount').not().isEmpty().withMessage('wining amount field is required'),
    check('status').not().isEmpty().withMessage('status field is required'),
    check('first_place').not().isEmpty().withMessage('first place field is required'),
    check('second_place').not().isEmpty().withMessage('second place field is required'),
    check('third_place').not().isEmpty().withMessage('third place field is required'),
    check('fourth_place').not().isEmpty().withMessage('fourth place field is required'),
    check('fifth_place').not().isEmpty().withMessage('fifth place field is required'),
    check('sixth_to_tenth_place').not().isEmpty().withMessage('sixth to tenth place field is required'),
    check('eleventh_to_twenty_place').not().isEmpty().withMessage('eleventh to twenty place field is required'),
    check('twenty_one_to_thirty_place').not().isEmpty().withMessage('twenty one to thirty place field is required'),
    check('thirty_one_to_forty_place').not().isEmpty().withMessage('thirty one to forty place field is required'),
    check('forty_one_to_fifty_place').not().isEmpty().withMessage('forty one to fifty place field is required'),
    check('fifty_one_to_one_hundred_place').not().isEmpty().withMessage('fifty one to one hundred place field is required'),
    check('one_hundred_one_to_five_hundred_place').not().isEmpty().withMessage('one hundred one to five hundred place field is required'),
    check('five_hundred_one_to_thousand_place').not().isEmpty().withMessage('five hundred one to thousand place field is required'),
    check('one_thousand_one_to_two_thousand_place').not().isEmpty().withMessage('one thousand one to two thousand place field is required'),
    check('two_thousand_one_to_three_thousand_place').not().isEmpty().withMessage('two thousand one to three thousand place field is required'),
    check('three_thousand_one_to_four_thousand_place').not().isEmpty().withMessage('three thousand one to four thousand place field is required'),
    check('four_thousand_one_to_five_thousand_place').not().isEmpty().withMessage('four thousand one to five thousand place field is required'),
   
]

exports.settingValidation = [
    check('text').not().isEmpty().withMessage('text field is required'),
]

exports.updateSettingValidation = [
    check('id').not().isEmpty().withMessage('id field is required'),
    check('text').not().isEmpty().withMessage('text field is required'),
]
exports.numberValidation = [
    check('number')
    .not().isEmpty().withMessage('number field is required')
    .isLength({ min: 10, max: 10 }).withMessage('number must be  10 digits')
    .isNumeric().withMessage('number must be a number')
];
exports.verifyOtp = [
    check('number')
    .not().isEmpty().withMessage('number field is required')
    .isLength({ min: 10, max: 10 }).withMessage('number must be  10 digits')
    .isNumeric().withMessage('number must be a number'),
    check('otp').not().isEmpty().withMessage('otp field is required')
]
exports.signupValidation = [
    check('number')
    .not().isEmpty().withMessage('number field is required')
    .isLength({ min: 10, max: 10 }).withMessage('number must be  10 digits')
    .isNumeric().withMessage('number must be a number'),
    check('name').not().isEmpty().withMessage('name field is required')
]

exports.updateProfileValidation = [
    check('name').not().isEmpty().withMessage('name field is required'),

];

exports.updateKycValidation = [
    check('name').not().isEmpty().withMessage('name field is required'),
    check('pan_no').not().isEmpty().withMessage('pan no field is required'),
    check('aadhar_no').not().isEmpty().withMessage('aadhar no field is required'),
    check('dob').not().isEmpty().withMessage('dob field is required'),

]
exports.changeStatusValidation = [
    check('id').not().isEmpty().withMessage('id field is required'),
    check('status').not().isEmpty().withMessage('status field is required'),

]
exports.addBankValidation = [
    check('account_no').not().isEmpty().withMessage('account no field is required'),
    check('ifsc_code').not().isEmpty().withMessage('ifsc code field is required'),
    check('bank_name').not().isEmpty().withMessage('bank name field is required'),
    check('bank_branch').not().isEmpty().withMessage('bank branch field is required'),
]


