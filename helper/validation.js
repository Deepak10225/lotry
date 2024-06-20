const {check} = require('express-validator');
exports.signupValidation = [
check('name','name feild is required').not().isEmpty(),
check('number','number feild is required').not().isEmpty(),
]