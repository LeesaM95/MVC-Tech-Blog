const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((data) => data.get({ plain: true }));

    res.json('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.json('login');
});

router.get("/signup", (req, res) => {
  res.render("signup")
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [User]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, logged_id: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [User]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, logged_id: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/newPost", (req, res) => {
  res.render("post");
});

router.get("/newComment/:id", async (req, res) => {
  const postData = await Blog.findOne({
    where: { id: req.params.id},
    include: [User],
  });

  const post = postData.get({ plain: true });

  const commentData = await Comment.findAll({
    where: { post_id: req.params.id}
  });

  const comment = commentData.map((comment) => comment.get({ plain: true}));

  res.render("comment", { post, comment, logged_id: req.session.logged_in});
});

router.get("/updatePost/:id", async (req, res) => {
  const postData = await Blog.findOne({
    where: { id: req.params.id },
    include: [User],
  });
  const posts = postData.get({ plain: true });

  res.render("editpost", { posts, logged_in: req.session.logged_in })
} );


module.exports = router;
