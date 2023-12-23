"use strict";
const User = require("./user"); // 1. require the model
const Post = require("./post"); // require the post model
const Comment = require("./comment"); // require the comment model

async function init() {
    await User.sync(); // 2. sync the model
    await Post.sync(); // sync the post model
    await Comment.sync(); // sync the comment model
}

init();

// 2.5 (optional) - associate the models
// see https://sequelize.org/docs/v6/core-concepts/assocs/
// sets up one-to-many relationship between users and posts

// we can define our own foreign key column names in options
// Post.belongsTo(User, { foreignKey: 'user_id' });
// User.hasMany(Post, { foreignKey: 'user_id' });

// if we leave out the second argument, Sequelize will auto-generate foreign key column names
Post.belongsTo(User);
User.hasMany(Post);

// sets up one-to-many relationship between posts and comments
Comment.belongsTo(Post);
Post.hasMany(Comment);

// sets up one-to-many relationship between users and comments
Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = {
    User, // 3. export the model
    Post, // export the post model
    Comment
};
