const Middleware = require('../../middleware/jwt'); // Adjust the path to your Middleware
const upload = require('../../upload-file/file-upload');
const { notificationValidition } = require('../../helper/validation');
const Notification = require('../../models/Notification');
const { formatValidationErrors } = require('./validation-response/apiResponse');
const { check, validationResult } = require('express-validator');

const notification = [upload.none(), Middleware.verifyToken, notificationValidition, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = formatValidationErrors(errors);
            return res.status(400).json({ errors: formattedErrors });
        }
        const { title, description } = req.body;
        const notification = new Notification({ title, description });
        await notification.save();
        res.status(200).send({ message: 'notification add successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Error fetching help and support', error });
    }
}
];

const getNotification = [upload.none(), Middleware.verifyToken, async (req, res) => {
    try {
        const notification = await Notification.find();
        const modifiedJackpot = notification.map(data => {
            const { _id, title, description, ...rest } = data.toJSON();
            return {
                id: _id,
                title: title,
                description: description,
            };
        });
        res.status(200).send({ notifications: modifiedJackpot });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching notification', error });
    }
}
];

const deleteNotification = [
    upload.none(), 
    Middleware.verifyToken, 
    async (req, res) => {
        try {
            const { id } = req.query; // Extract id from req.query
            const notification = await Notification.findByIdAndDelete(id); // Await the deletion operation

            if (notification) {
                return res.status(200).send({ message: 'Notification deleted successfully' });
            } else {
                return res.status(404).send({ message: 'Notification record not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Error deleting notification', error });
        }
    }
];


module.exports = {
    notification,
    getNotification,
    deleteNotification
}