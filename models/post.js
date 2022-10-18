'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, {foreignKey: "postId",sourceKey: "postId",});//###
      this.belongsTo(models.User, {foreignKey: "userId",sourceKey: "userId",});//###
      this.hasMany(models.Likes, {foreignKey: "postId",sourceKey: "postId",});//###




      // this.hasMany(models.Comment,{foreignKey: "postId",sourceKey: "postId",});
      // this.belongsTo(models.User,{foreignKey: "userId",sourceKey: "userId",});
      //this.hasMany(models.Likes, {foreignKey: "postId", sourceKey: "postId"});
      //this.belongsToMany(models.User, {through: "Likes"})
      // define association here
    }
  }
  Post.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      // autoIncrement: true,
      // primaryKey: true,
      type: DataTypes.INTEGER,
      references: {       //####
        model: "Users",//####
        key: "userId",//####
      },                //####
      onDelete: "cascade",//####
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    likecount: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};