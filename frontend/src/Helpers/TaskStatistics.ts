import type { Task } from '~/Models';
import { Priority, Status } from '~/Models';

export type TaskStatisticsType = {
    TotalTasks: () => number;
    LowPriorityTasks: () => number;
    NormalPriorityTasks: () => number;
    HighPriorityTasks: () => number;
    CompletedTasks: () => number;
    PendingTasks: () => number;
    CompletionRate: () => number;
    RecentTasks: (num: number) => Task[];
};

const CreateTaskStatistics = (tasks: Task[] | undefined) => {
    return {
        TotalTasks() {
            if (tasks) return tasks.length;
            return 0;
        },

        LowPriorityTasks() {
            if (tasks) return tasks?.filter((task) => task.priority === Priority.Low).length;
            return 0;
        },

        NormalPriorityTasks() {
            if (tasks) return tasks?.filter((task) => task.priority === Priority.Normal).length;
            return 0;
        },
        HighPriorityTasks() {
            if (tasks) return tasks?.filter((task) => task.priority === Priority.High).length;
            return 0;
        },
        CompletedTasks() {
            if (tasks) return tasks.filter((task) => task.status === Status.Completed).length;
            return 0;
        },
        PendingTasks() {
            if (tasks)
                return tasks?.filter((task) => task.status === Status.Todo || task.status === Status.InProgress).length;
            return 0;
        },
        CompletionRate() {
            if (tasks?.length != 0) return Math.floor((this.CompletedTasks() / this.TotalTasks()) * 100);
            return 0;
        },
        RecentTasks(num: number) {
            if (tasks) {
                const sortTasks = [...tasks].sort(
                    (task1, task2) => task2.createdAt.getTime() - task1.createdAt.getTime(),
                );
                return sortTasks.slice(0, num);
            }
            return [];
        },
    };
};

export default CreateTaskStatistics;
