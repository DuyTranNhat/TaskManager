import { request } from '~/utils';
import type { Task } from '~/Models';
import type { CreateTaskRequest, UpdateTaskRequest } from '~/Models/Task';

export const GetAllTaskApi = async () => {
    try {
        const response = await request.get<{ tasks: Task[] }>('tasks');
        return response.data;
    } catch (err) {
        console.log('error from GetAllTaskApi', err);
        throw err;
    }
};

export const CreateTaskApi = async (form: CreateTaskRequest) => {
    try {
        const response = await request.post<{
            message: string;
            task: Task;
        }>('tasks', form);
        return response.data;
    } catch (err) {
        console.log('error from CreateTaskApi', err);
        throw err;
    }
};

export const UpdateTaskApi = async (taskId: string, form: UpdateTaskRequest) => {
    try {
        const response = await request.put<{
            message: string;
            task: Task;
        }>(`tasks/${taskId}`, form);
        return response.data;
    } catch (err) {
        console.log('error from UpdateTaskApi', err);
        throw err;
    }
};

export const DeleteTaskApi = async (taskId: string) => {
    try {
        const response = await request.delete<{ message: string }>(`tasks/${taskId}`);
        return response.data;
    } catch (err) {
        console.log('error from DeleteTaskApi', err);
        throw err;
    }
};
