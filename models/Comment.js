const { Schema } = require('mongoose');
const dateFormat  = require('../utils/dateFormat');

const commentSchema = new Schema({
    commentId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    commentBody: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);



module.exports = commentSchema;