// loginApi.js
const bcrypt = require('bcrypt');
const Admin = require('../models/AdminRegister'); // Adjust the path to your Admin model
const Middleware = require('../middleware/jwt'); // Adjust the path to your Middleware

const loginApi = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email: email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = Middleware.jwt.sign({ _id: '667161d710c0b48d1c5474a4' }, Middleware.jwtSecret, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = loginApi;
