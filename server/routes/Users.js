const router = require('express').Router();
const User = require('../models/UserModel');
const Tweet = require('../models/TweetModel');
const bcrypt = require('bcrypt');

// Get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // Hide details that another user doesn't need to see
        const { email, password, isAdmin, updatedAt, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update user
router.put('/:id', async (req, res) => {
    // Re-encrypt password
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Account has been deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Follow user
router.put('/:id/follow', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $push: { followers: req.body.userId }
        }, { new: true });
        const currentUser = await User.findByIdAndUpdate(req.body.userId, {
            $push: { followers: req.body.userId }
        }, { new: true });

        res.status(200).json({
            user: user,
            currentUser: currentUser
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Unfollow user
router.put('/:id/unfollow', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.body.userId }
        }, { new: true });
        const currentUser = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { followers: req.body.userId }
        }, { new: true });

        res.status(200).json({
            user: user,
            currentUser: currentUser
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER DATA
// Get user tweets
router.get('/:id/tweets', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userTweets = await Tweet.find({
            userId: user._id
        });
        res.status(200).json([...userTweets]);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get liked tweets
router.get('/:id/likes', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.likes.length === 0) {
            res.status(404).json('User has not liked any tweets');
        } else {
            const userLikes = await Promise.all(
                user.likes.map(tweet => Tweet.findById(tweet))
            );
            res.status(200).json([...userLikes]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get retweets
router.get('/:id/retweets', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.retweets.length === 0) {
            res.status(404).json('User has not retweeted any tweets');
        } else {
            const userRetweets = await Promise.all(
                user.retweets.map(tweet => Tweet.findById(tweet))
            );
            res.status(200).json([...userRetweets]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get bookmarks (personal data)
router.get('/:id/bookmarks', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.bookmarks.length === 0) {
            res.status(404).json('User has not bookmarked any tweets');
        } else {
            const userBookmarks = await Promise.all(
                user.bookmarks.map(tweet => Tweet.findById(tweet))
            );
            res.status(200).json([...userBookmarks]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
