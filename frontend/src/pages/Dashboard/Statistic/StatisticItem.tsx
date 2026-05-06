import type { JSX } from 'react';

type Props = {
    Icon: ({ className, width, height }: { className?: string; width?: string; height?: string }) => JSX.Element;
    iconColorClass: string;
    valueColorClass: string;
    title: string;
    value: () => number;
};

const StatisticIem = ({ Icon, iconColorClass, valueColorClass, title, value }: Props) => {
    return (
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
            <Icon className={`size-9 rounded-lg ${iconColorClass} p-2`} />
            <div className="flex-1">
                <p className={`${valueColorClass} text-2xl font-bold`}>{value()}</p>
                <p className="text-xs text-gray-700/70">{title}</p>
            </div>
        </div>
    );
};

export default StatisticIem;
