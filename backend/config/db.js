const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/merabazar");
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Database Connection Failed");
        process.exit(1);
    }
};

module.exports = connectDB;
