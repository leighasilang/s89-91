const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const authenticate = require("../middleware/auth");

// CREATE POST
router.post("/", authenticate, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const newPost = new Post({
            title,
            content,
            author: req.user.id
        });

        await newPost.save();

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create post"
        });
    }
});

// GET ALL POSTS (PUBLIC)
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username");

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve posts"
        });
    }
});

// GET SINGLE POST (PUBLIC)
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "username")
            .populate("comments.user", "username");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);

    } catch (error) {
        res.status(400).json({
            message: "Invalid post ID"
        });
    }
});

// UPDATE POST (OWNER ONLY)
router.put("/:id", authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own posts"
            });
        }

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        post.title = title;
        post.content = content;

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update post"
        });
    }
});

// DELETE POST (OWNER OR ADMIN)
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (
            post.author.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "You are not allowed to delete this post"
            });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to delete post"
        });
    }
});

// ADD COMMENT (AUTHENTICATED USERS)
router.post("/:id/comments", authenticate, async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Comment is required"
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.comments.push({
            user: req.user.id,
            text
        });

        await post.save();

        res.status(201).json({
            message: "Comment added successfully",
            post
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to add comment"
        });
    }
});

module.exports = router;