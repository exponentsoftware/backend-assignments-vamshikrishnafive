const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskInfoSchema = mongoose.Schema({
    like:{
        type: [String],
        default: []
    },
    views: {
        type: [String],
        default: []
    },
    rating: {
        type: [String],
        default: []
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: "UserTaskModel"
    }
});

const taskInfoModel = mongoose.model('taskInfoModel', taskInfoSchema);

module.exports = taskInfoModel;