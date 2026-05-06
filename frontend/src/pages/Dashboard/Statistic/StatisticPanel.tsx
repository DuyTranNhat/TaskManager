import { Icon } from '~/components';
import { useTasks } from '~/Context';
import StatisticIem from './StatisticItem';

const StatisticPanel = () => {
    const { TaskStatistics } = useTasks();

    const statisticItems = [
        {
            Icon: Icon.DashboardIcon,
            iconColorClass: 'bg-main/10 text-main',
            valueColorClass: 'text-main/80',
            title: 'Tổng Tasks',
            value: TaskStatistics.TotalTasks,
        },
        {
            Icon: Icon.PriorityIcon,
            iconColorClass: 'bg-green-500/10 text-green-500',
            valueColorClass: 'text-green-500/80',
            title: 'Ưu tiên thấp',
            value: TaskStatistics.LowPriorityTasks,
        },
        {
            Icon: Icon.PriorityIcon,
            iconColorClass: 'bg-orange-500/10 text-orange-500',
            valueColorClass: 'text-orange-500/80',
            title: 'Ưu tiên vừa',
            value: TaskStatistics.NormalPriorityTasks,
        },
        {
            Icon: Icon.PriorityIcon,
            iconColorClass: 'text-red-500 bg-red-500/10',
            valueColorClass: 'text-red-500/80',
            title: 'Ưu tiên cao',
            value: TaskStatistics.HighPriorityTasks,
        },
    ];

    return (
        <div className="mt-8 flex gap-4">
            {statisticItems.map((item) => (
                <StatisticIem
                    key={item.title}
                    Icon={item.Icon}
                    iconColorClass={item.iconColorClass}
                    valueColorClass={item.valueColorClass}
                    title={item.title}
                    value={item.value}
                />
            ))}
        </div>
    );
};

export default StatisticPanel;
