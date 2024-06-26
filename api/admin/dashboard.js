const User = require('../../models/User'); // Adjust the path to your User model
const Middleware = require('../../middleware/jwt'); // Adjust the path to your Middleware
const Jackpot = require('../../models/Jackpot');
const KYC = require('../../models/KYC');

 const dashboard = [ Middleware.verifyToken, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJackpot = await Jackpot.countDocuments();
        const totalApprovedKYC = await KYC.countDocuments({status:'1'});
        const new_user = 0;
        const payment = 0;

        res.status(200).send({
            users: totalUsers,
            new_user: new_user,
            jackpot_counts: totalJackpot,
            kyc_approvals: totalApprovedKYC,
            payment: payment
        });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
 }
];
module.exports = dashboard;