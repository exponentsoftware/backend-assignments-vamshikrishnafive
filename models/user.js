const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    phone: {
        type: String,
        required: [true, 'phone is required']
    },
    roles: { type: Number, default: 1 }, // defalt 1: App User, 0: admin
    createdAt: { type: Date, default: new Date },
    updatedAt: { type: Date, default: new Date }
})

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;