const router = require('express').Router();
const Tweet = require('../models/TweetModel');
const User = require('../models/UserModel');

// New tweet
router.post('/', async (req, res) => {
    try {
        const newTweet = new Tweet(req.body);
        const savedTweet = await newTweet.save();
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $push: { tweets: savedTweet._id }
        }, { new: true });
        res.status(200).json({
            tweet: savedTweet,
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit tweet
router.put('/:id', async (req, res) => {
    try {
        const updatedTweet = await Tweet.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedTweet);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete tweet
router.delete('/:id', async (req, res) => {
    try {
        await Tweet.findByIdAndDelete(req.params.id);
        const user = await User.findById(req.body.userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get tweet
router.get('/:id', async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        res.status(200).json(tweet);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get timeline tweets
router.get('/timeline/all', async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userTweets = await Tweet.find({
            userId: currentUser._id
        });
        const otherTweets = await Promise.all(
            currentUser.following.map(otherUserId => {
                return Tweet.find({
                    userId: otherUserId
                });
            })
        );
        res.status(200).json([...userTweets, ...otherTweets]);
    } catch (err) {
        res.json(500).json(err);
    }
});

// Like tweet
router.put('/:id/like', async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndUpdate(req.params.id, {
            $push: { likes: req.body.userId }
        }, { new: true });
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $push: { likes: req.params.id }
        }, { new: true });

        res.status(200).json({
            tweet: tweet,
            user: user
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Unlike tweet
router.put('/:id/unlike', async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.body.userId }
        }, { new: true });
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { likes: req.params.id }
        }, { new: true });

        res.status(200).json({
            tweet: tweet,
            user: user
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Reply to tweet
router.put('/:id/reply', async (req, res) => {
    try {
        const reply = new Tweet(req.body);
        const savedReply = await reply.save();
        const tweet = await Tweet.findByIdAndUpdate(req.params.id, {
            $push: { replies: savedReply }
        }, { new: true });
        const user = User.findByIdAndUpdate(req.body.userId, {
            $push: { tweets: savedReply._id }
        }, { new: true });
        res.status(200).json({
            tweet: tweet,
            reply: savedReply,
            user: user
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete reply
router.delete('/:tweetId/delete/:replyId', async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndUpdate(req.params.tweetId, {
            $pull: { replies: req.params.tweetId }
        });
        await Tweet.findByIdAndDelete(req.params.replyId);
        res.status(200).json(tweet);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Retweet tweet
router.put('/:id/retweet', async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndUpdate(req.params.id, {
            $push: { retweets: req.body.userId }
        }, { new: true });
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $push: { retweets: req.params.id }
        }, { new: true });
        res.status(200).json({
            tweet: tweet,
            user: user
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Remove retweet
router.put('/:id/retweet/remove', async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndUpdate(req.params.id, {
            $pull: { retweets: req.body.userId }
        }, { new: true });
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { retweets: req.params.id }
        }, { new: true });
        res.status(200).json({
            tweet: tweet,
            user: user
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Bookmark tweet
router.put('/:id/bookmark', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $push: { bookmarks: req.params.id }
        }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Remove bookmark
router.put('/:id/bookmark/remove', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { bookmarks: req.params.id }
        }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
