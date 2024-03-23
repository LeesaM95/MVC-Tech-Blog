const { Comment } = require('../models')

const commentData = [
    {
        "commentBody": "Interesting post~",
        "user_id": []
    },
    {
        "commentBody": "Oh wow, I would have never thought of that.",
        "user_id": []
    },
    {
        "commentBody": "I'm interested to know how you came to this conclusion",
        "user_id": []
    },
    {
        "commentBody": "Cool!",
        "user_id":[]
    }
];

const commentSeeds = () => Comment.bulkCreate(commentData);
module.exports= commentSeeds;