/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useContext, type ReactNode } from 'react';

import { CreateTaskApi, DeleteTaskApi, GetAllTaskApi, UpdateTaskApi } from '~/services/TaskService';
import { Priority, Status, type CreateTaskRequest, type Task, type UpdateTaskRequest } from '~/Models';
import { CreateTaskStatistics, type TaskStatisticsType } from '~/Helpers';
import { DashboardFilterOptions, PendingSortOptions, CompletedSortOptions } from '~/pages/components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type ModalType = {
    type: 'create' | 'edit' | 'delete' | undefined;
    taskId: string | undefined;
};

type TaskModalHandlerType = {
    getOpen: () => boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getType: () => ModalType | undefined;
    setType: React.Dispatch<React.SetStateAction<ModalType | undefined>>;
    handleOpenCreateModal: () => void;
    handleOpenEditModal: (taskId: string) => void;
    handleOpenDeleteModal: (taskId: string) => void;
};

type FilterType = {
    filterTasks: Task[] | undefined;
    warning: string;
};

type TaskContextType = {
    isEmpty: () => boolean;
    TaskStatistics: TaskStatisticsType;
    TaskModalHandler: TaskModalHandlerType;
    getTasks: (filter: DashboardFilterOptions) => FilterType;
    getPendingTasks: (sort: PendingSortOptions) => Task[] | undefined;
    getCompletedTasks: (sort: CompletedSortOptions) => Task[] | undefined;
    createTask: (form: CreateTaskRequest) => void;
    updateTask: (taskId: string, form: UpdateTaskRequest) => void;
    getTask: (taskId: string) => Task | undefined;
    deleteTask: (taskId: string) => void;
};

const TasksContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[] | undefined>();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<ModalType>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await GetAllTaskApi();
                const newData = data?.tasks.map((task) => ({
                    ...task,
                    createdAt: new Date(task.createdAt),
                    dueDate: new Date(task.dueDate),
                }));
                setTasks(newData);
            } catch (err: any) {
                if (
                    err.response?.status === 401 ||
                    (err.response?.status === 403 &&
                        (err.response?.data?.code === 'REFRESH_EXPIRED' ||
                            err.response?.data?.code === 'REFRESH_INVALID'))
                ) {
                    navigate('/login');
                } else {
                    console.error(err);
                }
            }
        };

        fetchApi();
    }, []);

    const getOpen = () => open;
    const getType = () => type;

    const isEmpty = () => {
        if (tasks?.length === 0) return true;
        return false;
    };

    const getTasks = (filter: DashboardFilterOptions) => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        let warning = 'Chưa có task nào cả!';
        let filterTasks = tasks;
        switch (filter) {
            case DashboardFilterOptions.all:
                break;
            case DashboardFilterOptions.today:
                warning = 'Hôm nay không có task nào cả!';
                filterTasks = tasks?.filter((task) => task.dueDate.toDateString() === today.toDateString());
                break;
            case DashboardFilterOptions.week:
                warning = 'Không có deadline trong tuần!';
                filterTasks = tasks?.filter(
                    (task) =>
                        task.dueDate.toDateString() >= today.toDateString() &&
                        task.dueDate.toDateString() <= nextWeek.toDateString(),
                );
                break;
            case DashboardFilterOptions.high:
                warning = 'Không có task nào khó cả!';
                filterTasks = tasks?.filter((task) => task.priority === Priority.High);
                break;
            case DashboardFilterOptions.normal:
                warning = 'Không có task vừa vừa!';
                filterTasks = tasks?.filter((task) => task.priority === Priority.Normal);
                break;
            case DashboardFilterOptions.low:
                warning = 'Không có task nào dễ hết!';
                filterTasks = tasks?.filter((task) => task.priority === Priority.Low);
                break;
            default:
                break;
        }
        return {
            filterTasks,
            warning,
        };
    };

    const getPendingTasks = (sort: PendingSortOptions) => {
        const pendingTasks = tasks?.filter((task) => task.status === Status.InProgress || task.status === Status.Todo);
        const priorityOrder = {
            [Priority.High]: 3,
            [Priority.Normal]: 2,
            [Priority.Low]: 1,
        };
        switch (sort) {
            case PendingSortOptions.newest:
                return pendingTasks?.sort((task1, task2) => task2.createdAt.getTime() - task1.createdAt.getTime());
            case PendingSortOptions.oldest:
                return pendingTasks?.sort((task1, task2) => task1.createdAt.getTime() - task2.createdAt.getTime());
            case PendingSortOptions.priority:
                return pendingTasks?.sort((task1, task2) => {
                    return priorityOrder[task2.priority] - priorityOrder[task1.priority];
                });
            default:
                return pendingTasks;
        }
    };

    const getCompletedTasks = (sort: CompletedSortOptions) => {
        const completedTasks = tasks?.filter((task) => task.status === Status.Completed);
        const priorityOrder = {
            [Priority.High]: 3,
            [Priority.Normal]: 2,
            [Priority.Low]: 1,
        };
        switch (sort) {
            case CompletedSortOptions.newest:
                return completedTasks?.sort((task1, task2) => task2.createdAt.getTime() - task1.createdAt.getTime());
            case CompletedSortOptions.oldest:
                return completedTasks?.sort((task1, task2) => task1.createdAt.getTime() - task2.createdAt.getTime());
            case CompletedSortOptions.priority:
                return completedTasks?.sort((task1, task2) => {
                    return priorityOrder[task2.priority] - priorityOrder[task1.priority];
                });
            default:
                return completedTasks;
        }
    };

    const getTask = (taskId: string) => {
        if (tasks) {
            return tasks.find((task) => task.taskId === taskId);
        }
    };

    const createTask = async (form: CreateTaskRequest) => {
        try {
            const data = await CreateTaskApi(form);
            if (data) {
                toast.success(data.message);
                setTasks([
                    ...(tasks as Task[]),
                    {
                        ...data.task,
                        createdAt: new Date(data.task.createdAt),
                        dueDate: new Date(data.task.dueDate),
                    },
                ]);
            }
        } catch (err: any) {
            if (
                err.response?.status === 401 ||
                (err.response?.status === 403 &&
                    (err.response?.data?.code === 'REFRESH_EXPIRED' || err.response?.data?.code === 'REFRESH_INVALID'))
            ) {
                navigate('/login');
            } else {
                console.error(err);
            }
        }
    };

    const updateTask = async (taskId: string, form: UpdateTaskRequest) => {
        try {
            const data = await UpdateTaskApi(taskId, form);
            if (data) {
                toast.success(data.message);
                const newTasks = tasks?.map((task) => {
                    if (task.taskId === data?.task.taskId) {
                        return {
                            ...data.task,
                            createdAt: new Date(data.task.createdAt),
                            dueDate: new Date(data.task.dueDate),
                        };
                    } else {
                        return {
                            ...task,
                            createdAt: new Date(task.createdAt),
                            dueDate: new Date(task.dueDate),
                        };
                    }
                });
                setTasks(newTasks as Task[]);
            }
        } catch (err: any) {
            if (
                err.response?.status === 401 ||
                (err.response?.status === 403 &&
                    (err.response?.data?.code === 'REFRESH_EXPIRED' || err.response?.data?.code === 'REFRESH_INVALID'))
            ) {
                navigate('/login');
            } else {
                console.error(err);
            }
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const data = await DeleteTaskApi(taskId);
            toast.success(data?.message);
            const newTasks = tasks?.filter((task) => {
                if (task.taskId !== taskId) {
                    return {
                        ...task,
                        createdAt: new Date(task.createdAt),
                        dueDate: new Date(task.dueDate),
                    };
                }
            });
            setTasks(newTasks);
        } catch (err: any) {
            if (
                err.response?.status === 401 ||
                (err.response?.status === 403 &&
                    (err.response?.data?.code === 'REFRESH_EXPIRED' || err.response?.data?.code === 'REFRESH_INVALID'))
            ) {
                navigate('/login');
            } else {
                console.error(err);
            }
        }
    };

    const TaskStatistics = CreateTaskStatistics(tasks);
    const TaskModalHandler = {
        setOpen,
        setType,
        getOpen,
        getType,
        handleOpenCreateModal() {
            setOpen(true);
            setType({
                type: 'create',
                taskId: undefined,
            });
        },
        handleOpenEditModal(taskId: string) {
            setType({
                type: 'edit',
                taskId: taskId,
            });
            setOpen(true);
        },
        handleOpenDeleteModal(taskId: string) {
            setType({
                type: 'delete',
                taskId: taskId,
            });
            setOpen(true);
        },
    };
    return (
        <TasksContext.Provider
            value={{
                TaskStatistics,
                TaskModalHandler,
                isEmpty,
                getTasks,
                createTask,
                updateTask,
                getTask,
                deleteTask,
                getCompletedTasks,
                getPendingTasks,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);
