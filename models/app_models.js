import mongoose from 'mongoose';

const UserTaskSchema = mongoose.Schema({
    name: String,
    title: String,
    isTaskCompleted: {
        type: Boolean,
        default: false
    },
    category: {
        type: Object,
        Work: {
            type:Boolean,
            default:false
        },
        hoddy: {
            type:Boolean,
            default:false
        },
        task: {
            type:Boolean,
            default:false
        },
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

export default UserTaskModel;