const router = require('express').Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Create user
router.post('/register', async (req, res) => {
    try {
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
