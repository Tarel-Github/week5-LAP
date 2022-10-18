'use strict';
const { Model} = require('sequelize');
/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // this.hasMany(models.Post, { foreignKey: "userId", sourceKey: "userId" });//#######
      // this.hasMany(models.Comment, {foreignKey: "userId",sourceKey: "userId",});//#######
      // this.hasMany(models.Likes, {foreignKey: "userId",sourceKey: "userId",});//#######


      // this.hasMany(models.Post,{foreignKey: "userId",sourceKey: "userId",});
      // this.hasMany(models.Comment,{foreignKey: "postId",sourceKey: "postId",});
      //this.hasMany(models.Likes, {foreignKey: "postId", sourceKey: "postId"});
      //this.belongsToMany(models.Post, {through: "Likes"})
      // define association here
    }
  }
  User.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
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
    timestamps: false,//#
    modelName: 'User',
  });
  return User;
};