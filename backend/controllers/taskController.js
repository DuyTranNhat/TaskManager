import Task from "../models/TaskModel.js";

export async function createTask(req, res) {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed,
      owner: req.user.id,
    }); 

    const savedTask = await task.save();

    return res.status(201).json({ success: true, task: savedTask });
  } catch (error) {
    console.error("Lỗi tạo task", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
}

//get all task for logged - in user
export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Lỗi lấy tasks", error);
    return res.status(500).json({ success: false, message: error.message || "Lỗi hệ thống" });
  }
}

//get single task by id 
export async function getTaskById(req, res) {
  const taskId = req.params.id; 
  try {
    const task  
      = await Task.findOne({ _id: taskId, owner: req.user.id });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task không tồn tại" });
    }   
    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Lỗi lấy task theo id", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }   
}

//update task
export async function updateTask(req, res) {
  try {
    const data =  {...req.body}
    if (data.completed !== undefined) {
      data.completed = data.completed === true
    }
    // Update the task fields
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task không tồn tại" });
    }

    return res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Lỗi cập nhật", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
}

//delete task
export async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });    
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task không tồn tại" });
    }
    return res.status(200).json({ success: true, message: "Task đã được xóa" });
  } catch (error) {
    console.error("Lỗi xóa", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }  
}
