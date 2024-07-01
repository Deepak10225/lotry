const Middleware = require('../../middleware/jwt');
const Banner = require('../../models/Banner');
const Jackpot = require('../../models/Jackpot');

const jackpotHome = [Middleware.verifyToken, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time part to zero for accurate date comparison
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const jackpots = await Jackpot.find();
        const banner = await Banner.find();

        const modifiedJackpot = jackpots.map(data => {
            const { _id, name, description, prize, starting_date, prize_pool, join_count, wining_amount, profileImagePath, ...rest } = data.toJSON();
            
            // Convert 'd-m-y' format to a valid Date object
            const [day, month, year] = starting_date.split('-').map(Number);
            const jackpotDate = new Date(year, month - 1, day);
            
            let status = 'ongoing';
            console.log(`Jackpot Date: ${jackpotDate}, Today: ${today}`);

            if (jackpotDate < today) {
                status = 'expired';
            } else if (jackpotDate > today) {
                status = 'upcoming';
            }
            return {
                id: _id,
                name: name,
                prize_pool: prize_pool,
                join_count: join_count,
                date: starting_date,
                total_wining_amount: wining_amount,
                buy_jackpot: prize,
                image: `${baseUrl}/uploads/images/${profileImagePath}`,
                status: status
            };
        });
        const modifiedBanner = banner.map(data => {
            const { _id, profileImagePath, ...rest } = data.toJSON();
            return {
                id: _id,
                image: `${baseUrl}/uploads/images/${profileImagePath}`
            };
        });
        res.status(200).send({ jackpots: modifiedJackpot, banners: modifiedBanner });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching jackpots', error });
    }
}
];

module.exports = {
    jackpotHome
}