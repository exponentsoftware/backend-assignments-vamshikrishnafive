const taskInfoModel = require("../models/taskInfo");

exports.likes = async(req, res) => {
    const id = req.params.id;
    const Task = await taskInfoModel.findOne({id})
    console.log(req.user.id)
    const index = Task.like.findIndex((id) => id === String(req.user._id));

    if(index === -1 ) {
        Task.like.push(req.user._id);
    } else {
        Task.like = Task.like.filter((id) => id !== String(req.user._id));
    }
    const updatedTask = await taskInfoModel.findOneAndUpdate(id, like, {new: true});
    res.status(200).json(updatedTask)
};

exports.rating = async(req, res) => {
    const id = req.params
    const Task = await taskInfoModel.findOne({id})
    const index = Task.rating.findIndex((id) => id === String(req.user._id));

    if(index === -1) {
        Task.rating.push(req.user._id);
    } else {
        Task.rating = Task.rating.filter((id) => id !== String(req.user._id));
    }
    const updatedTask = await taskInfoModel.findOneAndUpdate(id, rating, {new: true});
    res.status(200).json(updatedTask)
};

exports.sortByMostView = async(req, res) => {
    try {
        const views = await taskInfoModel.aggregate([
            {$group: { _id: "views", count: { $sum: 1}}},
            {$sort: {count: 1}}
        ]) 
        res.status(200).json(MaxTask)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}