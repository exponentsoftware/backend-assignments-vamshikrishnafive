const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserTaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is missing']
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['Work', 'Hobby', 'Task'],
        required: [true, 'category is missing']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    createdAt: {
        type: Date,
        default: new Date,
    },
    updatedAt: {
        type: Date,
        default: new Date,
    }
});

const UserTaskModel = mongoose.model('UserTaskModel', UserTaskSchema);

module.exports = UserTaskModel;