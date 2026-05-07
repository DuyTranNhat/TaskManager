import { useEffect, useState } from "react";
import 'tippy.js/dist/tippy.css';

import { useTasks } from '~/Context';
import { Icon } from '~/components';
import { TaskList, DashboardFilterOptions as filterOptions } from '../components';
import { StatisticPanel } from './Statistic';


const filterLabels = {
    all: 'Tất cả',
    today: 'Hôm nay',
    week: 'Tuần',
    high: 'Cao',
    normal: 'Vừa',
    low: 'Thấp',
};

const Dashboard = ({ title }: { title: string }) => {
    const { TaskModalHandler } = useTasks();
    const [filter, setFilter] = useState<filterOptions>(filterOptions.all);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className="wrapper">
            <div className="flex justify-between">
                <div className="flex justify-center gap-2">
                    <Icon.DashboardIcon className="text-main size-12" />
                    <span>
                        <p className="text-2xl font-bold">Task Overview</p>
                        <p className="text-xs text-gray-700/70">Quản lý task của bạn một cách hiệu quả</p>
                    </span>
                </div>
                <button
                    onClick={() => TaskModalHandler.handleOpenCreateModal()}
                    className="bg-gradient-color flex cursor-pointer items-center gap-1 rounded-xl p-3 text-white hover:opacity-85"
                >
                    <Icon.PlusIcon className="-mt-[1px] inline-block" />
                    <span>Thêm task mới</span>
                </button>
            </div>

            <StatisticPanel />

            <div className="mt-8 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                <div>
                    <Icon.FunnelIcon className="text-main mr-2 mb-1 inline-block" />
                    <span className="text-md font-semibold">Tất cả Tasks</span>
                </div>
                <div className="flex gap-1 rounded-lg bg-gray-300/20 p-2">
                    {Object.keys(filterOptions).map((option) => (
                        <div
                            key={option}
                            onClick={() => setFilter(filterOptions[option as keyof typeof filterOptions])}
                            className={`cursor-pointer rounded-lg p-2 text-xs font-semibold transition-all duration-200 ${filter === filterOptions[option as keyof typeof filterOptions]
                                    ? 'text-main outline-main bg-white outline'
                                    : 'hover:text-main text-gray-500 hover:shadow-md'
                                }`}
                        // className="filterItem"
                        >
                            {filterLabels[option as keyof typeof filterLabels]}
                        </div>
                    ))}
                </div>
            </div>
            <TaskList
                options={filter}
                setCreateModal={TaskModalHandler.handleOpenCreateModal}
                setEditModal={TaskModalHandler.handleOpenEditModal}
                setDeleteModal={TaskModalHandler.handleOpenDeleteModal}
            />
        </div>
    );
}

export default Dashboard;   