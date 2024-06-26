
const express = require('express');
const app = express();
const db = require('./db/db');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(cors());
const port = 3000;
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
const loginApi = require('./api/admin/loginApi');
const {getUser,addUser} = require('./api/admin/userApi');
const dashboard = require('./api/admin/dashboard');
const {jackpot,getJackpots,deleteJackpots} = require('./api/admin/jackpot');
const {getKYC,deleteKYC,changeKycStatus} = require('./api/admin/kyc');
const {banner,deleteBanner,helpAndSupport,updateHelpAndSupport,aboutUs,updateAboutUs,refundPolicy,updateRefundPolicy, termsAndCondetion, updatetermsAndCondetion,getBanner,helpAndSuport,getAboutUs,getRefundPolicy,getTermsAndCondetion} = require('./api/admin/setting');

const {checkNumber,verifyOTP,signup} = require('./api/app/user');
const {getProfile,updateProfile} = require('./api/app/profile');
const {kycVerification,uploadKyc} = require('./api/app/kyc');
const {jackpotHome} = require('./api/app/jackpot');
const {addBank,getBank,deleteBank} = require('./api/app/bank');
// Login Api
app.post('/api/login',loginApi);

// Users Api
app.post('/api/add-user',addUser);
app.get('/api/get-user',getUser);

// Dashboard
app.get('/api/dashboards',dashboard);

// Jackpot
app.post('/api/create-jackpot',jackpot);
app.get('/api/jackpots',getJackpots);
app.get('/api/delete-jackpot',deleteJackpots);

// Setting
app.post('/api/add-banner',banner);
app.get('/api/delete-banner',deleteBanner);
app.get('/api/get-banner',getBanner);
app.post('/api/help-and-support',helpAndSupport);
app.post('/api/update-help-and-support',updateHelpAndSupport);
app.get('/api/help-and-support',helpAndSuport);
app.post('/api/about-us',aboutUs);
app.get('/api/about-us',getAboutUs);
app.post('/api/update-about-us',updateAboutUs);
app.post('/api/refund-policy',refundPolicy);
app.get('/api/refund-policy',getRefundPolicy);
app.post('/api/update-refund-policy',updateRefundPolicy);
app.post('/api/terms-and-condetion',termsAndCondetion);
app.post('/api/update-terms-and-condetion',updatetermsAndCondetion);
app.get('/api/terms-and-conditions',getTermsAndCondetion);

//  KYC 
app.get('/api/kyc-details',getKYC);
app.get('/api/delete-kyc',deleteKYC);
app.post('/api/change-kyc-status',changeKycStatus);





// ************************************************************************************************ //

// App Api
app.post('/api/check-number',checkNumber);
app.post('/api/verify-otp',verifyOTP);
app.post('/api/signup',signup);

// Profile
app.get('/api/get-profile',getProfile);
app.post('/api/update-profile',updateProfile);

// KYC
app.post('/api/kyc-verification',kycVerification);
app.post('/api/upload-kyc',uploadKyc);

// Home
app.get('/api/jackpot-home',jackpotHome);

// Bank
app.post('/api/add-bank',addBank);
app.get('/api/get-bank',getBank);
app.get('/api/delete-bank',deleteBank);




app.listen(port, () => {
    console.log(`server run at port no : ${port}`);
});
