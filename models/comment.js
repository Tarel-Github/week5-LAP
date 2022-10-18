'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Post, {foreignKey: "postId",sourceKey: "postId",});//###
      this.belongsTo(models.User, {foreignKey: "userId",sourceKey: "userId",});//###

    }
  }
  Comment.init({
    commentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postId: {
      allowNull: false,
      // autoIncrement: true,
      // primaryKey: true,
      type: DataTypes.INTEGER,
      references: {//###
        model: "Posts",//###
        key: "postId",//###
      },//###
      onDelete: "cascade",//###
    },
    userId: {
      allowNull: false,
      // autoIncrement: true,
      // primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "userId",
      },
      onDelete: "cascade",
    },
    content: {
      type: DataTypes.STRING
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
    modelName: 'Comment',
  });
  return Comment;
};