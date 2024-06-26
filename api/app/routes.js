
const express = require('express');
const app = express();
const db = require('../../db/db');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const {checkNumber} = require('./user');

// User Auth
app.post('/api/check-number',checkNumber);


module.exports = {app,express}