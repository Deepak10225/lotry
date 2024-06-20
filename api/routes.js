
const express = require('express');
const app = express();
const db = require('../db/db');
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

app.post('/api/login',loginApi);
app.post('/api/add-user',addUser);
app.get('/api/get-user',getUser);
app.get('/api/dashboards',dashboard);
app.post('/api/create-jackpot',jackpot);
app.get('/api/jackpots',getJackpots);

module.exports = {app,express}