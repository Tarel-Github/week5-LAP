'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER //Sequelize.INTEGER 여기 및으로 전부데이터 타입을 넣어주었다.
      },

      userId: {
        type: Sequelize.DataTypes.INTEGER,//Sequelize.INTEGER
        allowNull: false,
        references: {
          model:"Users",
          key:"userId",
        },
        onDelete: "cascade",
      },

      title: {
        type: Sequelize.DataTypes.STRING
      },
      content: {
        type: Sequelize.DataTypes.STRING
      },
      likecount: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      }
    });
  },
  /**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};