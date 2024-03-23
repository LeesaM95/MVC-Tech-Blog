const router = require('express').Router();
// Import the User model from the models folder
const { User } = require('../../models');

//user sign up logic
router.post("/signup", (req, res) => {
  User.create(req.body).then((userData) => {
    req.session.save(() => {
      req.session.username = userData.username;
      req.session.id = userData.id;
      req.session.logged_in = trueres.redirect("/dashboard")
    });
  });
});

//user login logic
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      res.render("/dashboard");
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//user logout logic
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;