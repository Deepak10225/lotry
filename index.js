const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const db = require('./db/db');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Admin = require('./models/AdminRegister');
const User = require('./models/User');
const upload = require('./upload-file/file-upload');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

const jwtSecret = 'mynameisdeepakgoswamimynameisdeepakgoswamimynameisdeepak';


app.get('/', (req, res) => {
    return res.json('hello');
})
async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: ' token not available' });
        
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err.message);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({_id : '667161d710c0b48d1c5474a4'}, jwtSecret, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/add-user',verifyToken, upload.single('profile'), async (req, res) => {
    try {
        const { name, number, profile } = req.body;
        let profileImagePath = req.file.filename;
        const user = new User({ name, number, profile, profileImagePath });
        await user.save();
        res.status(201).send({ message: 'User added successfully'});
    } catch (error) {
        res.status(400).send({ message: 'Error adding user', error });
    }
});
app.get('/api/get-user',verifyToken,async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const users = await User.find();
        const modifiedUsers = users.map(user => ({
            ...user.toJSON(),
            profileImagePath: `${baseUrl}/uploads/images/${user.profileImagePath}`
        }));

        res.status(200).send({ users: modifiedUsers });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
});
app.get('/api/dashboards',verifyToken,async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).send({ users: totalUsers });
        
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
});

app.listen(port, () => {
    console.log(`server run at port no : ${port}`);
});
