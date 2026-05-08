import { useEffect, useState } from 'react';

import { Icon } from '~/components';
import { TaskList, PendingSortOptions as sortOptions } from '../components';
import { useTasks } from '~/Context';

const sortLabels = {
    newest: {
        label: 'Mới nhất',
        Icon: Icon.BarDownIcon,
    },
    oldest: {
        label: 'Cũ nhất',
        Icon: Icon.BarUpIcon,
    },
    priority: {
        label: 'Ưu tiên',
        Icon: Icon.PriorityIcon,
    },
};

const PendingTask = ({ title }: { title: string }) => {
    const [sort, setSort] = useState<sortOptions>(sortOptions.newest);
    useEffect(() => {
        document.title = title;
    }, [title]);
    const { TaskStatistics, TaskModalHandler } = useTasks();

    return (
        <div className="wrapper">
            <div className="flex justify-between">
                <div className="flex justify-center gap-2">
                    <Icon.PendingIcon className="text-main size-12" />
                    <span>
                        <p className="text-2xl font-bold">Chờ xử lý</p>
                        <p className="text-xs text-gray-700/70">
                            {TaskStatistics.PendingTasks()} task đang chờ bạn xử lý
                        </p>
                    </span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white px-2 py-3 text-sm shadow-sm">
                    <div>
                        <Icon.FunnelIcon className="text-main mr-1 mb-1 inline-block" />
                        <span className="font-semibold">Lọc: </span>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-gray-300/20 p-1 text-xs">
                        {Object.keys(sortOptions).map((option) => (
                            <div
                                key={option}
                                onClick={() => setSort(sortOptions[option as keyof typeof sortOptions])}
                                className={`cursor-pointer rounded-lg p-2 font-semibold transition-all duration-200 ${sort === sortOptions[option as keyof typeof sortOptions]
                                        ? 'text-main bg-white shadow-lg'
                                        : 'hover:text-main text-gray-500 hover:shadow-md'
                                    }`}
                            >
                                {sortLabels[option as keyof typeof sortLabels].Icon({
                                    className: 'hover:text-main mr-1 inline-block',
                                })}
                                {sortLabels[option as keyof typeof sortLabels].label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <TaskList
                options={sort}
                setCreateModal={TaskModalHandler.handleOpenCreateModal}
                setEditModal={TaskModalHandler.handleOpenEditModal}
                setDeleteModal={TaskModalHandler.handleOpenDeleteModal}
            />
        </div>
    );
};

export default PendingTask;
