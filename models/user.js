const { Sequelize } = require('sequelize');
const database = require('../config/database');

const UserSchema = database.define('User',{
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.NUMBER
    },
    password: {
        type: Sequelize.STRING
    },
    isActive: {
        type: Sequelize.NUMBER
    },
    roles: {
        type: Sequelize.NUMBER
    }, // defalt 1: App User, 0: admin
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
})

module.exports = UserSchema;