const { User, Blog } = require('../models');

module.exports = {
    async getPost(req, res) {
        try {
            const post = await Blog.find();
                
            res.json(post);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSinglePost(req, res) {
        try {
            const post = await Blog.findOne({ _id: req.params.postId });
            if (!post) {
                return res.status(404).json({ message: "No post with that ID" });
            }
            res.json(post)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createPost(req, res) {
        try {
            const post = await Blog.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { post: post._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({
                    message: "Post created, but found no user with that ID"
                })
            }
            res.json(post)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updatePost(req, res) {
        try {
            const post = await Blog.findOneAndUpdate(
                { _id: req.params.postId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!post) {
                return res.status(404).json({
                    message: "No post with this id!"
                })
            }
            res.json(post);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    async deletePost(req, res) {
        try {
            const post = await Blog.findOneAndRemove({ _id: req.params.postId });

            if (!post) {
                return res.status(404).json({ message: 'No post with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { post: req.params.postId },
                { $pull: { post: req.params.postId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Post created but no user with this id!',
                });
            }

            res.json({ message: 'Post successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addComment(req, res) {
        try {
            const post = await Blog.findOneAndUpdate(
                { _id: req.params.postId },
                { $addToSet: { comments: req.body } },
                { runValidators: true, new: true }
            );

            if (!post) {
                return res.status(404).json({ message: 'No post with this id!' });
            }

            res.json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeComment(req, res) {
        try {
            const post = await Blog.findOneAndUpdate(
                { _id: req.params.postId },
                { $pull: { comments: { commentId: req.params.commentId } } },
                { runValidators: true, new: true }
            );

            if (!post) {
                return res.status(404).json({ message: 'No post with this id!' });
            }

            res.json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

