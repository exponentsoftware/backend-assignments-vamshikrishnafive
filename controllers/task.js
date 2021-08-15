const UserTaskModel = require('../models/Task.js');
const taskInfoModel = require('../models/TaskInfo.js');

exports.adminUser = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {}
    if (endIndex < UserTaskModel.count()) {
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
        results.results = await UserTaskModel.findAll({
            limit: limit,
            offset: startIndex
        })
        // limit(limit).skip(startIndex).exec()
        res.status(200).json(results);
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
    if (endIndex < UserTaskModel.count()) {
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
        results.results = await UserTaskModel.findAll({
            where: {
                createdBy: createdBy
            },
            limit: limit,
            offset: startIndex
        })
        // .limit(limit).skip(startIndex).exec()
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};

exports.createUserTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { name, value, isTaskCompleted, category } = req.body;
        const updateTodo = await UserTaskModel.create({ name, value, isTaskCompleted, category })
        res.status(200).json(updateTodo);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};

exports.updateUserTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { name, value, isTaskCompleted, category } = req.body;
        const user = await UserTaskModel.findByPk(id)
        if (user == id) { 
            const updateTodo = await UserTaskModel.create({ name, value, isTaskCompleted, category })
            res.status(200).json(updateTodo);
        }
    } catch (error) {
        res.status(404).json({ error: error })
    }
};

exports.deleteUserTodo = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserTaskModel.findByPk(id)
        if (user == id) { 
            const updateTodo = await UserTaskModel.destroy()
            res.status(200).json(updateTodo);
        }
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
    if (endIndex < UserTaskModel.count()) {
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
        results.results = await UserTaskModel.findAll({
            where : { title: query },
            limit: limit,
            skip: startIndex
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

exports.searchByCategory = async (req, res) => {
    const { category } = req.query;
    try {
        const query = new RegExp(category, "i");
        results.results = await UserTaskModel.findOne({
            where : { category : query }
        })
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
    if (endIndex < UserTaskModel.count()) {
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
        results.results = await UserTaskModel.findAll({
            order:[[ 'createdAt', 'desc']],
            limit: limit,
            skip: startIndex
        })
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

exports.sortByNoOfCompletedTaskForallUsers = async (req, res) => {
    try {
        const results = await UserTaskModel.aggregate([{ $match: { isCompleted: 1 } }])
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

exports.UsersCompletedMaxTask = async (req, res) => {

    try {
        const MaxTask = await UserTaskModel.aggregate([
            { $match: { isCompleted: 1 } },
            { $group: { _id: "$createdBy", Total: { $sum: 1 } } },
            { $sort: { total: 1 } }
        ])
        res.status(200).json(MaxTask)
    } catch (error) {
        res.status(404).json({ error: error.message });
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
        const ViewTask = await taskInfoModel.findOne({ id })
        const index = ViewTask.views.findIndex((id) => id === String(req.user._id));

        if (index === -1) {
            ViewTask.views.push(req.user_id);
        } else {
            ViewTask.views = ViewTask.views.filter((id) => id !== String(req.user_id));
        }
        const updatedTask = await taskInfoModel.findOneAndUpdate(id, views, { new: true });
        res.status(200).json(results, updatedTask);
    } catch (error) {
        res.status(404).json({ error: error })
    }
};