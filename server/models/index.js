const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Image = require('./image');
const Comment = require('./comment');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Image = Image;
db.Comment = Comment;

User.init(sequelize);
Post.init(sequelize);
Image.init(sequelize);
Comment.init(sequelize);

User.hasMany(Post, {foreignKey: 'user_id'});
Post.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Comment, {foreignKey: 'user_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'});

Post.hasMany(Image, {foreignKey: 'post_id'});
Image.belongsTo(Post, {foreignKey: 'post_id'});

Post.hasMany(Comment, {foreignKey: 'post_id'});
Comment.belongsTo(Post, {foreignKey: 'post_id'});

module.exports = db;
