const Middleware = require('../../middleware/jwt');
const { formatValidationErrors } = require('./validation-response/apiResponse');
const { addBankValidation } = require('../../helper/validation');
const upload = require('../../upload-file/file-upload');
const { check, validationResult } = require('express-validator');
const Bank = require('../../models/Bank')

const addBank = [Middleware.verifyToken,upload.none(),addBankValidation,async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(422).json({ errors: formattedErrors });
        }
        const {account_no,ifsc_code,bank_name ,bank_branch } = req.body;
        const bank = new Bank({account_no,ifsc_code,bank_name ,bank_branch});
        await bank.save();
        res.status(200).json({'message':'Bank details submitted successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Error varification Bank', error });

   }
}
];

const getBank = [Middleware.verifyToken,async(req,res)=>{
    try {
        const bank = await Bank.find();
        const modifiedJackpot = bank.map(data => {
            const { _id, account_no,ifsc_code,bank_name,bank_branch, ...rest } = data.toJSON();
            return {
                id: _id,
                account_no:account_no,
                ifsc_code:ifsc_code,
                bank_name:bank_name,
                bank_branch:bank_branch,
            };
        });
        res.status(200).send({ banks: modifiedJackpot });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching bank', error });
    }
}
];

const deleteBank =  [Middleware.verifyToken,async (req, res) => {
      try {
        const { id } = req.query;
        const bank = await Bank.findByIdAndDelete(id);
        if (!bank) {
          return res.status(404).send({ message: 'Bank record not found' });
        }
        res.status(200).send({ message: 'Bank deleted successfully' });
      } catch (error) {
        res.status(500).send({ message: 'Error deleting Bank', error });
      }
    }
  ];
module.exports = {
    addBank,
    getBank,
    deleteBank
}