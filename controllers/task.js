const UserTaskModel = require('../models/task.js');

exports.adminUser = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {}
    if (endIndex < UserTaskModel.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    try {
        results.results = await UserTaskModel.find().limit(limit).skip(startIndex).exec()
        // res.status(200).json(results);
        res.render('todo.ejs', { data: JSON.stringify(results) })
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

exports.getAllUserTodo = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {}
    if (endIndex < UserTaskModel.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    const createdBy = req.params.user_id
    try {
        results.results = await UserTaskModel.find({createdBy})
        .limit(limit).skip(startIndex).exec()
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};

exports.createUserTodo = async (req, res) => {

    const Todo = req.body;
    const Post = new UserTaskModel({ ...Todo, createdBy: req.params.user_id });
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

exports.searchByTitle = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const { title } = req.query;
    let results = {}
    if (endIndex < UserTaskModel.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    try {
        const query = new RegExp(title, "i");
        results.results = await UserTaskModel.find({ title: query }).limit(limit).skip(startIndex).exec()
        res.status(200).json(result);
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
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const { order } = req.query;
    let results = {}
    if (endIndex < UserTaskModel.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    try {
        results.results = await UserTaskModel.find({})
            .sort({ createdAt: order }).limit(limit).skip(startIndex).exec()
        res.status(200).json(results);
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
        const results = await UserTaskModel.findById({ _id: id });
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};