const { Blog } = require('../models');


const postData =
[
    {
        "postTitle": "MongoDB & Twitter",
        "post": "Did you know most social media networks use mongoDB to deal with data? Let's dive into how...",
        "dateCreated": [],
        "user_id": []
    },
    {
        "postTitle": "RegEx: Expression Through Color",
        "post":"Regular Expressions (RegExes) are a super powerful tool. Here's why...",
        "dateCreated":[],
        "user_id": []
    },
    {
        "postTitle": "Coding Rules to Live By",
        "post":"Bugging your code is easy. The hard part is not giving up while trying to fix it.",
        "dateCreated":[],
        "user_id": []
    },
    {
        "postTitle": "Algorithms to Keep Your Mind Sharp",
        "post":"Let's be real here: coding can be a chore. And if you forget something? It's like learning all over again...",
        "dateCreated":[],
        "user_id": []
    }
]

const postSeeds = () => Blog.bulkCreate(postData);

module.exports = postSeeds;