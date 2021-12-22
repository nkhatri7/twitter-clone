const router = require('express').Router();
const User = require('../models/UserModel');
const Tweet = require('../models/TweetModel');
const bcrypt = require('bcrypt');

// Get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // Hide details that another user doesn't need to see
        const { email, password, bookmarks, isAdmin, updatedAt, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get active user
router.get('/active/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
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
        const user = await User.findById(req.params.id);

        // Remove everything user has interacted with including other users and tweets
        if (user.following.length > 0) {
            const userFollowingList = user.following;
            userFollowingList.forEach(async userId => {
                await User.findByIdAndUpdate(userId, {
                    $pull: { followers: req.params.id }
                });
            });
        }

        if (user.followers.length > 0) {
            const userFollowers = user.followers;
            userFollowers.forEach(async userId => {
                await User.findByIdAndUpdate(userId, {
                    $pull: { following: req.params.id }
                });
            });
        }

        if (user.likes.length > 0) {
            const likes = user.likes;
            likes.forEach(async tweetId => {
                await Tweet.findByIdAndUpdate(tweetId, {
                    $pull: { likes: req.params.id }
                });
            });
        }

        if (user.retweets.length > 0) {
            const retweets = user.retweets;
            retweets.forEach(async tweetId => {
                await Tweet.findByIdAndUpdate(tweetId, {
                    $pull: { retweets: req.params.id }
                });
            });
        }
        
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
            $push: { following: req.params.id }
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
            $pull: { following: req.params.id }
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
        const userTweets = await Tweet.find({
            userId: req.params.id
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

// Clear bookmarks
router.put('/:id/bookmarks/clear', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: { bookmarks: [] }
        }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user followers
router.get('/:id/followers', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const followers = [];
        user.followers.forEach(async (userId, idx, array) => {
            const follower = await User.findById(userId);
            const { email, password, bookmarks, isAdmin, updatedAt, ...otherDetails } = follower._doc;
            followers.push(otherDetails);
            if (followers.length === array.length) {
                res.status(200).json(followers);
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user following
router.get('/:id/following', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const following = [];
        user.following.forEach(async (userId, idx, array) => {
            const user = await User.findById(userId);
            const { email, password, bookmarks, isAdmin, updatedAt, ...otherDetails } = user._doc;
            following.push(otherDetails);
            if (following.length === array.length) {
                res.status(200).json(following);
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Validate password
router.post('/password/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(406).json("Incorrect password");
        } else {
            // Send back user object
            res.status(200).json("Valid password");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Check if username is available
router.post('/username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user ? res.status(200).json('Username is available') : res.status(406).json('Username is taken');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Check if email is already in use
router.post('/email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user ? res.status(200).json('Email is available') : res.status(406).json('Email is in use');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
