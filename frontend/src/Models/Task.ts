export enum Status {
    Todo = 'Todo',
    InProgress = 'InProgress',
    Completed = 'Completed',
}

export enum Priority {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
}

export interface Task {
    taskId: string;
    userId: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: Date;
    createdAt: Date;
}

export type CreateTaskRequest = {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: Date;
};

export type UpdateTaskRequest = {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: string;
};
