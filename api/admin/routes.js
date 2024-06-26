
const express = require('express');
const app = express();
const db = require('../../db/db');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
const loginApi = require('./loginApi');
const {getUser,addUser} = require('./userApi');
const dashboard = require('./dashboard');
const {jackpot,getJackpots} = require('./jackpot');
const {banner,deleteBanner,helpAndSupport,updateHelpAndSupport,aboutUs,updateAboutUs,refundPolicy,updateRefundPolicy, termsAndCondetion, updatetermsAndCondetion,getBanner,helpAndSuport,getAboutUs,getRefundPolicy,getTermsAndCondetion} = require('./setting');

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


module.exports = {app,express}