const { Blog, Comment, User } = require('../../models');
const router = require("express").Router();
const withAuth = require('../../utils/auth')

// get all posts
router.get('/posts', async (req, res) => {
    try {
        const getPosts = await Blog.findAll({include: [{ model: User }]});
        res.status(200).json(getPosts)
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a single post
router.get("/posts/:blogId", withAuth, async (req, res) => {
    try {
        const getPost = await Blog.findByPk(req.params.id, {
            include: [{ model: User}]
        });
        if (!getPost) {
            res.status(404).json({ message: "Post doesn't exist!"});
            return;
        }
        res.status(200).json(getPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

//create new post
router.post("/newPost", async (req, res) => {
   try  {
    newPost = await Blog.create({
        ...req.body,
        user_ud: req.session.user_id,
    });
    res.status(200).json(newPost);
   } catch(err) {
    res.status(400).json(err);
   }
})

//edit post
router.get("/editPost/:id", (req, res) => {
    try {
        const updatePost = Blog.update({
            title: req.body.postTitle,
            post: req.body.post,
        },
        {where: { id: req.params.id }},
     );

     if(updatePost) {
        res.status(200).json(updatePost)
     }
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//create new comment
router.post("/newComment/:id", async (req, res) => {
    try {
        const newComment = await Comment.create(
            {...req.body,
            user_id: req.session.user_id},
            { returning:true }
        );
        res.status(200).json(newComment)
    } catch(err) {
        res.status(400).jsin(err);
    }
})


//delete post
router.delete("/deletePost/:id", async (req, res) => {
    try {
        const postData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postData) {
            res.status(404).json({ message: 'No post found with this id!'})
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router