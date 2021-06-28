import mongoose from 'mongoose';

const UserTaskSchema = mongoose.Schema({
    name: String,
    title: String,
    isTaskCompleted: {
        type: Boolean,
        default: false
    },
    category: [String],
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

export default UserTaskModel;