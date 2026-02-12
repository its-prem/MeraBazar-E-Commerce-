const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log("AUTH ROUTES LOADED");

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ message: "User Registered Successfully ✅" });

    } catch (error) {
        res.status(500).json({ message: "Registration Failed ❌" });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User Not Found ❌" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password ❌" });
        }

        const token = jwt.sign(
            { userId: user._id },
            "secretkey123",
            { expiresIn: "1d" }
        );

        console.log("TOKEN GENERATED:", token);

        res.json({
            message: "Login Successful ✅",
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: "Login Failed ❌" });
    }
});

module.exports = router;
