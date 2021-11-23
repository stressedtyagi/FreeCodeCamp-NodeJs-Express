const Task = require("../models/tasks");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send({ tasks });
    } catch (err) {
        res.status(500).send(err);
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).send(err);
    }
};

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msq: `No Task with id : ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).send(err);
    }
};
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ msq: `No Task with id : ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).send(err);
    }
};
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msq: `No Task with id : ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
