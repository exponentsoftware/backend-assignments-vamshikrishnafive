const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/database');

const UserTaskSchema = database.define('Task', {
    title: {
        type: DataTypes.STRING
    },
    isCompleted: {
        type: DataTypes.NUMBE
    }, // 0 is not completed, 1 is completed
    category: {
        type: Sequelize.STRING
    },
    createdBy: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = UserTaskSchema;