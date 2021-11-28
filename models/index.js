const User = require('./User');
const Post = require('./Post');
const Follower = require('./Follower');
const Comment = require('./Comment');
// const Friendship = require('./Friendship');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo( Post, {
    foreignKey: "post_id",
});

Follower.belongsTo(User,{
 as: "following",
 foreignKey:"following_id",
 sourceKey:"user_id"
});

Follower.hasOne(User,{
    as:'follower',
    foreignKey:"user_id",
    constraints: false
})



module.exports = { User, Post, Comment };
