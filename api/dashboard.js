const User = require('../models/User'); // Adjust the path to your User model
const Middleware = require('../middleware/jwt'); // Adjust the path to your Middleware

 const dashboard = [ Middleware.verifyToken, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const new_user = 0;
        const jackpot_counts = 0;
        const kyc_approvals = 0; // You should replace this with actual logic to fetch KYC approvals
        const payment = 0;

        res.status(200).send({
            users: totalUsers,
            new_user: new_user,
            jackpot_counts: jackpot_counts,
            kyc_approvals: kyc_approvals,
            payment: payment
        });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
 }
];
module.exports = dashboard;