const router = require('express').Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Create user
router.post('/signup', async (req, res) => {
    try {
        // Check if username is taken
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            res.status(202).json('Username already taken');
        } else {
            // Generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword,
                displayName: req.body.displayName,
            });

            // Save new user and send back user object
            const user = await newUser.save();
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Check if email is already in use
router.post('/signup/email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(202).json('Email has already been taken.');
        } else {
            res.status(200).json('Email is available');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Validate user
router.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({username: req.body.username});
        !user && res.status(404).json('User not found');

        // Check for valid password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Incorrect password");

        // Send back user object
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
