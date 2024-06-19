const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://iam000:123@cluster0.dih35we.mongodb.net/lotery');
        console.log('DB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

connectDB();
