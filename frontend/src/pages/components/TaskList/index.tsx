/* eslint-disable react-refresh/only-export-components */
import images from '~/assets/images';
import { Icon } from '~/components';
import TaskItem from './TaskItem';
import { useTasks } from '~/Context';

export enum DashboardFilterOptions {
    all = 'all',
    today = 'today',
    week = 'week',
    high = 'high',
    normal = 'normal',
    low = 'low',
}

export enum PendingSortOptions {
    newest = 'pending_newest',
    oldest = 'pending_oldest',
    priority = 'pending_priority',
}

export enum CompletedSortOptions {
    newest = 'completed_newest',
    oldest = 'completed_oldest',
    priority = 'completed_priority',
}

type FilterType = DashboardFilterOptions | PendingSortOptions | CompletedSortOptions;

type TaskList = {
    options: FilterType;
    setCreateModal: () => void;
    setEditModal: (taskId: string) => void;
    setDeleteModal: (taskId: string) => void;
};

const TaskList = ({ options, setCreateModal, setEditModal, setDeleteModal }: TaskList) => {
    const { isEmpty, getTasks, getPendingTasks, getCompletedTasks } = useTasks();
    let OptionComponent = <></>;
    if (Object.values(DashboardFilterOptions).includes(options as DashboardFilterOptions)) {
        const { filterTasks, warning } = getTasks(options as DashboardFilterOptions);
        if (filterTasks?.length !== 0) {
            OptionComponent = (
                <>
                    {filterTasks?.map((task) => (
                        <TaskItem
                            key={task.taskId}
                            task={task}
                            setEditModal={setEditModal}
                            setDeleteModal={setDeleteModal}
                        />
                    ))}
                </>
            );
        } else {
            OptionComponent = (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
                    <img src={images.emptyImage} className="bg-main/5 size-30 rounded-full p-4" alt="Empty Image" />

                    <p className="mb-2 text-lg font-light text-gray-400">{warning}</p>
                </div>
            );
        }
    } else if (Object.values(PendingSortOptions).includes(options as PendingSortOptions)) {
        const sortTasks = getPendingTasks(options as PendingSortOptions);
        OptionComponent = (
            <>
                {sortTasks?.map((task) => (
                    <TaskItem
                        key={task.taskId}
                        task={task}
                        setEditModal={setEditModal}
                        setDeleteModal={setDeleteModal}
                    />
                ))}
            </>
        );
    } else {
        const sortTasks = getCompletedTasks(options as CompletedSortOptions);
        OptionComponent = (
            <>
                {sortTasks?.map((task) => (
                    <TaskItem
                        key={task.taskId}
                        task={task}
                        setEditModal={setEditModal}
                        setDeleteModal={setDeleteModal}
                    />
                ))}
            </>
        );
    }

    return (
        <>
            {isEmpty() ? (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
                    <Icon.CalendarIcon className="text-main bg-main/10 size-14 rounded-full p-3" />
                    <p className="text-lg font-medium">Chưa có task nào cả!</p>
                    <p className="text-xs text-gray-500">Tạo task đầu tiên để bắt đầu thôi nào</p>
                    <button
                        onClick={() => setCreateModal()}
                        className="bg-gradient-color cursor-pointer rounded-xl p-3 text-sm text-white hover:opacity-85"
                    >
                        Thêm task mới
                    </button>
                </div>
            ) : (
                OptionComponent
            )}
            <button
                onClick={() => setCreateModal()}
                className="bg-side/3 hover:bg-side/5 mt-8 flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-gray-300 p-5 shadow-sm"
            >
                <Icon.PlusIcon className="text-main -mt-[2px] size-5" />
                <span className="text-md">Thêm task mới</span>
            </button>
        </>
    );
};

export default TaskList;
