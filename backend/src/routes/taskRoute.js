import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { taskSchema } from '../validations/task.js';

const taskRouter = express.Router();

//PUBLIC LINKS

taskRouter.route("/")
    .get(authMiddleware, getTasks)
    .post(authMiddleware, validateMiddleware(taskSchema), createTask);

//PRIVATE LINKS
taskRouter.route("/:id")
    .get(authMiddleware, getTasks)
    .put(authMiddleware, validateMiddleware(taskSchema), updateTask)
    .delete(authMiddleware, deleteTask);

export default taskRouter;