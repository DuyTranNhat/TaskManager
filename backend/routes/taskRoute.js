import express from "express";


import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const taskRouter = express.Router();   

//PUBLIC LINKS

taskRouter.route("/gp")
    .get(authMiddleware, getTasks)
    .post(authMiddleware, createTask);

//PRIVATE LINKS
taskRouter.route("/:id/gp")
    .get(authMiddleware, getTasks)
    .put(authMiddleware, updateTask)
    .delete(authMiddleware, deleteTask);

export default taskRouter;