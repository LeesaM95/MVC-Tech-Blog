const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blog',
            key: 'id',
        },
    },
},
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    },
);



module.exports = Comment;