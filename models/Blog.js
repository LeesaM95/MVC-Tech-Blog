const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const commentSchema = require('./comment')

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        postTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post: {
            type: DataTypes.STRING,
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        comment: [
            commentSchema
        ],     
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
      }
);

commentSchema.virtual("comments").get(function () {
    let comments = commentSchema;
        if(comments !== 'undefined') {
            console.log(comments.length)
        } else {
            return this.comments.length;
        }
       
    });
    
    const Blog = Model("Blog", blogSchema);
    
    module.exports = Blog;