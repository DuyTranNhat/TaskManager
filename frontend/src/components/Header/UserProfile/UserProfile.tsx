import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '~/components';
import config from '~/config';

const UserProfile = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [visible, setVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            {/* Dropdown menu */}
            {visible && (
                <div className="animate-fadeIn absolute right-0 bottom-full mb-2 z-50 rounded-2xl bg-white px-3 py-2 text-sm shadow-md min-w-[180px]">
                    <Link
                        to={config.routes.editProfile}
                        onClick={() => setVisible(false)}
                        className="flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-300/20"
                    >
                        <Icon.SettingIcon />
                        <span className="flex-1">Cài đặt thông tin</span>
                    </Link>
                    <a
                        onClick={() => {
                            setVisible(false);
                            setOpen(true);
                        }}
                        className="flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-300/20"
                    >
                        <Icon.LogoutIcon className="text-red-500" />
                        <span className="flex-1">Đăng xuất</span>
                    </a>
                </div>
            )}

            {/* Trigger */}
            <div
                className="group ml-5 flex cursor-pointer rounded-2xl p-2 hover:bg-gray-300/20"
                onClick={() => setVisible(!visible)}
            >
                <div className="relative">
                    <Icon.UserIcon className="bg-gradient-color size-10 rounded-full p-2 text-white" />
                    <div className="absolute right-0 bottom-[5px] size-[10px] rounded-full border-[2px] border-white bg-green-500"></div>
                </div>
                <div className="mx-2">
                    <h1 className="text-sm font-bold">Tên người dùng</h1>
                    <span className="text-xs text-gray-500">email@example.com</span>
                </div>
                <Icon.HeaderMenuIcon className="group-hover:text-main mt-2 size-5 cursor-pointer text-gray-500/100 transition-transform duration-300 group-hover:rotate-180" />
            </div>
        </div>
    );
};

export default UserProfile;
