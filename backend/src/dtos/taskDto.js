export const toTaskDTO = (task) => ({
    taskId: task._id.toString(),
    userId: task.userId.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate.toISOString(),
    createdAt: task.createdAt.toISOString(),
});
