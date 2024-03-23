const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models')
const postSeeds = require('./blogData');
const userSeeds = require('./userData');
const commentSeeds = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(postSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentSeeds, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedAll();