const UserTaskModel = require('../models/task.js');

exports.adminUser = async(req, res) => {
    try {
        const Alltodo = await UserTaskModel.find({});
        res.status(200).json(Alltodo);
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

exports.getAllUserTodo = async (req, res) => {
    const id = req.params.user_id
    // res.send(_id)
    try {
        const UserTodo = await UserTaskModel.find({ createdBy:id });
        res.status(200).json(UserTodo);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};

exports.createUserTodo = async (req, res) => {

    const Todo = req.body;
    const Post = new UserTaskModel({...Todo, createdBy: req.params.user_id});
    try {
        await Post.save();
        res.status(200).json(PostT);
    } catch (error) {
        res.status(404).json({ Error: error })
    }
};

exports.updateUserTodo = async (req, res) => {
    const { id } = req.params
    const { name, value, isTaskCompleted, category } = req.body;
    const updateTodo = await UserTaskModel.findByIdAndUpdate({ _id: id }, { name, value, isTaskCompleted, category }, { new: true },)
    try {
        await updateTodo.save()
        res.status(200).json(updateTodo);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};

exports.deleteUserTodo = async (req, res) => {
    const { id } = req.params
    try {
        await UserTaskModel.findByIdAndRemove({ _id: id });
        res.status(200).json("Successfull deleted")
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error })
    }
};

//day2 

exports.searchByTitle = async (req, res) => {
    const { title } = req.query;
    try {
        const query = new RegExp(title, "i");
        const post = await UserTaskModel.find({ title: query })
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

exports.searchByCategory = async (req, res) => {
    const { category } = req.query;
    try {
        const query = new RegExp(category, "i");
        const post = await UserTaskModel.findOne({ category: query })
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

exports.sortByDate = async (req, res) => {
    const { order } = req.query;
    try {
        const SortedList = await UserTaskModel.find({})
            .sort({ createdAt: order })
        res.status(200).json(SortedList);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

exports.completedTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatePost = await UserTaskModel.findOneAndUpdate({ _id: id }, { isCompleted: true }, { new: true })
        updatePost.save();
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

exports.getSigleTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const singleTask = await UserTaskModel.findById({ _id: id });
        res.status(200).json(singleTask);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};