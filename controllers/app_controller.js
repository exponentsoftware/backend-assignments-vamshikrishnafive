import UserTaskModel from '../models/app_models';

export const FetchAllUserTask = async (req,res) => {
    try {
        const Alltasks = await UserTaskModel.find({});
        res.status(200).json(Alltasks);
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error})
    }
};

export const FetchUserTaskById = async (req,res) => {
    const { id } = req.params;
    try {
        const singleTask = await UserTaskModel.findById({_id: id});
        res.status(200).json(singleTask);
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error})
    }
};

export const createUserTask = async(req,res) => {
    const { name, title, isTaskCompleted, category } = req.body;
    const PostTask = new UserTaskModel({name, title, isTaskCompleted, category});
    try {
        await PostTask.save();
        res.status(200).json(PostTask);
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error})
    }
};

export const updateUserTask = async(req,res) => {
    const { id } = req.params
    const { name, title, isTaskCompleted, category } = req.body;
    const updateTask = await UserTaskModel.findByIdAndUpdate({ _id:id},{ name, title, isTaskCompleted, category},{new: true},)
    try {
        await updateTask.save()
        res.status(200).json(updateTask);
    } catch (error) {
        console.log(error);
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