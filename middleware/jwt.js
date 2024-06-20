const jwt = require('jsonwebtoken');

const jwtSecret = 'mynameisdeepakgoswamimynameisdeepakgoswamimynameisdeepak';

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
module.exports = {jwt,jwtSecret,verifyToken}