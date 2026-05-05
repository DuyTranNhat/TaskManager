import { Icon } from '~/components';

const RightBar = () => {
    return (
        <div className="wrapper sticky top-25 self-start py-10 pr-5">
            <div className="rounded-2xl bg-white p-4 shadow-md">
                <div className="mb-3">
                    <Icon.IncreaseIcon className="text-main mb-1 inline-block" />
                    <span className="text-md ml-2 font-medium">Thống kê Task</span>
                </div>
                <div className="grid w-md grid-cols-2 grid-rows-2 gap-4">
                    <div className="flex items-center gap-2 rounded-2xl border border-gray-200/50 bg-white p-4 shadow-sm">
                        <Icon.CircleIcon className="bg-main/10 text-main size-9 rounded-lg p-2" />
                        <div className="flex-1">
                            <p className="text-main/80 text-2xl font-bold">{0}</p>
                            <p className="text-xs text-gray-700/70">Tổng Tasks</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-gray-200/50 bg-white p-4 shadow-sm">
                        <Icon.CircleIcon className="bg-main/10 size-9 rounded-lg p-2 text-green-500" />
                        <div className="flex-1">
                            <p className="text-main text-2xl font-bold">{0}</p>
                            <p className="text-xs text-gray-700/70">Hoàn tất</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-gray-200/50 bg-white p-4 shadow-sm">
                        <Icon.CircleIcon className="bg-main/10 text-main size-9 rounded-lg p-2" />
                        <div className="flex-1">
                            <p className="text-main/80 text-2xl font-bold">{0}</p>
                            <p className="text-xs text-gray-700/70">Chờ xử lý</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-gray-200/50 bg-white p-4 shadow-sm">
                        <Icon.LogoIcon className="bg-main/10 text-main size-9 rounded-lg p-2" />
                        <div className="flex-1">
                            <p className="text-main/80 text-2xl font-bold">{`${0} %`}</p>
                            <p className="text-xs text-gray-700/70">Tỉ lệ hoàn thành</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 border-t-2 border-gray-300/30 pt-5">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <span className="bg-main/70 inline-block size-3 rounded-2xl"></span>
                            <span className="text-md ml-1">Tiến trình</span>
                        </div>
                        <div className="bg-side/10 text-main rounded-lg px-2 text-sm">{`${0} / ${0}`}</div>
                    </div>
                    <div className="mt-3 h-2 rounded-2xl bg-gray-300/30">
                        <div
                            style={{ width: `${0}%` }}
                            className={`bg-gradient-color h-full rounded-2xl`}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="mt-5 rounded-2xl bg-white p-5 pb-10 shadow-md">
                <div>
                    <Icon.ClockIcon className="text-main mr-2 mb-1 inline-block" />
                    <span className="font-medium">Hoạt động gần đây</span>
                </div>
            </div>
        </div>
    );
};

export default RightBar;
