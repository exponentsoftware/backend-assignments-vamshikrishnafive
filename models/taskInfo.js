const { Sequelize } = require('sequelize');
const database = require('../config/database');

const taskInfoSchema = database.define('TaskInfo', {
    like: {
        type: Sequelize.STRING
    },
    views:  {
        type: Sequelize.STRING
    },
    rating:  {
        type: Sequelize.STRING
    },
    taskId:  {
        type: Sequelize.STRING
    }
});

module.exports = taskInfoSchema;