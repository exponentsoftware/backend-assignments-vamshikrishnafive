import UserTaskModel from '../models/app_models';

export const FetchAllUserTask = async (req,res) => {
    try {
        const Alltasks = await UserTaskModel.find({});
        res.status(200).json(Alltasks);
    } catch (error) {
        res.status(404).json({error: error})
    }
};

export const FetchUserTaskById = async (req,res) => {
    const { id } = req.params;
    try {
        const singleTask = await UserTaskModel.findById({_id: id});
        res.status(200).json(singleTask);
    } catch (error) {
        res.status(404).json({error: error})
    }
};

export const createUserTask = async(req,res) => {
    const { name, value, isTaskCompleted, category } = req.body;
    const PostTask = new UserTaskModel({name, value, isTaskCompleted, category});
    try {
        await PostTask.save();
        res.status(200).json(PostTask);
    } catch (error) {
        res.status(404).json({error: error})
    }
};

export const updateUserTask = async(req,res) => {
    const { id } = req.params
    const { name, value, isTaskCompleted, category } = req.body;
    const updateTask = await UserTaskModel.findByIdAndUpdate({ _id:id},{ name, value, isTaskCompleted, category},{new: true},)
    try {
        await updateTask.save()
        res.status(200).json(updateTask);
    } catch (error) {
        res.status(404).json({error: error})
    }
};

export const DeleteUserTask = async(req,res) => {
    const { id } = req.params
    try {
        await UserTaskModel.findByIdAndRemove({_id:id});
        res.status(200).json("Successfull deleted")
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error})
    }
};

//day2 

export const searchByTitle = async(req, res) => {
    const {title} = req.query;
    try {
        const query = new RegExp(title, "i");
        const post = await UserTaskModel.find({title: query})
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({error:error});
    }
}

export const searchByCategory = async(req, res) => {
    const {category} = req.query;
    try {
        const query = new RegExp(category, "i");
        const post = await UserTaskModel.find({category: query})
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({error:error});
    }
}

export const sortByDate = async(req, res) => {
    const {order} = req.query;
    try {
        const Alltasks = await UserTaskModel.find({})
            .sort({createdAt: order})
        res.status(200).json(Alltasks);
    } catch (error) {
        res.status(404).json({error:error});
    }
}

export const completedTask = async(req, res) => {
    const {id} = req.params;
    try {
        const updatePost = await UserTaskModel.findOneAndUpdate({_id:id}, {isTaskCompleted: true}, {new: true})
        updatePost.save();
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(404).json({error: error})
    }
}