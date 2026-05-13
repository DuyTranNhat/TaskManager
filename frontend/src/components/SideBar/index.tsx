import { NavLink } from 'react-router-dom';


import { Icon } from '~/components';
import config from '~/config';

const menuItems = [
    { name: 'Dashboard', icon: Icon.DashboardIcon, path: config.routes.dashboard },
    { name: 'Chờ xử lý', icon: Icon.PendingIcon, path: config.routes.pending },
    { name: 'Hoàn tất', icon: Icon.CompletedIcon, path: config.routes.completed },
];

const SideBar = () => {


    return (
     
    <aside className="sticky top-25 hidden h-screen w-64 shrink-0 self-start p-6 shadow-md md:block">        <div className="flex border-b border-gray-300/30 pb-5">
                <Icon.UserIcon className="bg-gradient-color size-10 rounded-full p-2 text-white" />
                <div className="ml-2 flex-1">
                    <h1 className="text-sm font-bold">Xin chào, Trần Nhật Duy</h1>
                    <div className="bg-gradient-color mt-1 flex items-start bg-clip-text text-xs text-transparent italic">
                        <Icon.StarIcon className="text-side mr-1 inline-block" />
                        <span>Bắt đầu công việc nào!</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 rounded-2xl border-2 border-gray-300/10 p-3">
                <div className="text-main flex items-center justify-between">
                    <p className="font-bold">Năng suất</p>
                    <p className="bg-main/10 rounded-2xl p-2 text-xs">
                        {/* {`${TaskStatistics.CompletionRate()}%`} */}
                    </p>
                </div>
                <div className="mt-3 h-2 rounded-2xl bg-gray-300/30">
                    <div
                        // style={{ width: `${TaskStatistics.CompletionRate()}%` }}
                        className={`bg-gradient-color h-full rounded-2xl`}
                    ></div>
                </div>
            </div>
            <nav className="mt-3 flex flex-col">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center rounded-2xl border-l-3 border-gray-200/2 p-3 transition-colors duration-300 ${isActive ? 'from-side/5 to-main/5 border-main text-main bg-gradient-to-r font-bold shadow-sm' : ''}`
                        }
                    >
                        <item.icon className="text-main mr-2 inline-block" />
                        <span className="mt-0.5">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="from-side/5 to-main/5 mt-5 flex items-center gap-2 rounded-2xl bg-gradient-to-r p-5 shadow-md">
                <Icon.LightIcon className="text-main size-12 rounded-2xl bg-gray-300/30 p-2" />
                <div className="text-sm">
                    <h1 className="mb-2 font-bold">Mẹo vặt</h1>
                    <p className="mb-1">Dùng phím tắt để tăng trải nghiệm</p>
                    <p className="text-main/80 hover:text-main/100 cursor-pointer">Tham khảo thêm dịch vụ</p>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
