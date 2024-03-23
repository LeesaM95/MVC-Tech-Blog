const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts from one user
router.get('/dashboard/posts', withAuth, async (req, res) => {
    try {
        const userPosts = await Blog.findAll({
            where: { user_id: req.session.user_id },
            include: [
                {model: Comment,
                attributes: ['id', 'commentBody', 'blog_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
            ]
        });
        const postData = userPosts.map((post) => post.get({ plain: true}));
        res.render('dashboard', {
            postData,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

// render a 'new post' page
router.get('/newPost', withAuth, (req, res) => {
// The code below makes sure that the user must be logged in to create a new post
    if(!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    res.render('newPost', {
        logged_in: req.session.logged_in,
    });
});

// render 'update post' page with proper post to update

router.get('/editPost/:id', withAuth, async (res, req) => {
    if(!req.session.logged_id) {
        res.redirect('/login');
        return;
    }
    
    try {
        const postData = await Blog.findByPk(req.params.id, {
            include: [{model: User}]
        });

        const post = postData.get({ plain: true });

        res.render('editPost', {
            ...post,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router