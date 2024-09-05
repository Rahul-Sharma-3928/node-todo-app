import ErrorHandler from "../middlewares/error.js";
import Task from "../models/taskData.js";

//  Create Task
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully...",
    });
  } catch (error) {
    next(error);
  }
};

// Get Task
export const getTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await Task.find({ user: userId });

    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// Update Task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Update...",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Delete...",
      // task,
    });
  } catch (error) {
    next(error);
  }
};
