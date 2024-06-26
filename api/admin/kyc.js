const Middleware = require('../../middleware/jwt');
const KYC = require('../../models/KYC');
const KYCDocument = require('../../models/KYCDocument');
const upload = require('../../upload-file/file-upload');
const { check, validationResult } = require('express-validator');
const { formatValidationErrors } = require('./validation-response/apiResponse');
const {changeStatusValidation} = require('../../helper/validation')

const getKYC = [
    Middleware.verifyToken,
    async (req, res) => {
      try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        
        const kycDetails = await KYC.aggregate([
          {
            $lookup: {
              from: 'kycdocuments', // the name of the kycdocuments collection
              localField: 'user_id', // field in KYC collection
              foreignField: 'user_id', // field in kycdocuments collection
              as: 'kyc_documents' // output array field
            }
          },
          {
            $addFields: {
              kyc_documents: {
                $arrayElemAt: ['$kyc_documents', 0]
              }
            }
          },
          {
            $project: {
              name: 1,
              pan_no: 1,
              aadhar_no: 1,
              status: 1,
              'kyc_documents.pan_img': 1,
              'kyc_documents.aadhar_img': 1
            }
          }
        ]);
        const modifiedKYCDetails = kycDetails.map(kyc => {
          if (kyc.kyc_documents) {
            if (kyc.kyc_documents.pan_img) {
              kyc.kyc_documents.pan_img = `${baseUrl}/uploads/images/${kyc.kyc_documents.pan_img}`;
            }
            if (kyc.kyc_documents.aadhar_img) {
              kyc.kyc_documents.aadhar_img = `${baseUrl}/uploads/images/${kyc.kyc_documents.aadhar_img}`;
            }
          }
          return {
            id: kyc._id,
            name: kyc.name,
            pan_no: kyc.pan_no,
            aadhar_no: kyc.aadhar_no,
            pan_img: kyc.kyc_documents.pan_img,
            aadhar_img: kyc.kyc_documents.aadhar_img,
            status: kyc.status,
          };
        });
  
        res.status(200).send({ kyc_details: modifiedKYCDetails });
      } catch (error) {
        res.status(500).send({ message: 'Error fetching KYC details', error });
      }
    }
  ];
  
  const deleteKYC = [
    Middleware.verifyToken,
    async (req, res) => {
      try {
        const { id } = req.query;
        const kyc = await KYC.findById(id);
        if (!kyc) {
          return res.status(404).send({ message: 'KYC record not found' });
        }
        const kycDocument = await KYCDocument.findOne({ user_id: kyc.user_id });
        if (kycDocument) {
          await kycDocument.deleteOne();
        }
        await kyc.deleteOne();
  
        res.status(200).send({ message: 'KYC details deleted successfully' });
      } catch (error) {
        res.status(500).send({ message: 'Error deleting KYC details', error });
      }
    }
  ];
  
 const changeKycStatus = [ Middleware.verifyToken,upload.none(),changeStatusValidation,async(req,res)=>{
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = formatValidationErrors(errors);
        return res.status(400).json({ errors: formattedErrors });
    }
    const {id,status} = req.body;
    const kyc = await KYC.findByIdAndUpdate(id, { status }, { new: true, runValidators: true } // Options to return the updated document and run validators
    );
    if (!kyc) {
        return res.status(404).send({ message: 'id not found' });
    }
    
    res.status(200).send({ message: 'KYC Status update successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error update KYC Status', error });
  }
 }
 ];

module.exports = {
    getKYC,
    deleteKYC,
    changeKycStatus
}