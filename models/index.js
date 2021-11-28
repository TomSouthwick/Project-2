const User = require('./User');
const Post = require('./Post');
const Friendship = require('./Friendship');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Post ,Friendship };