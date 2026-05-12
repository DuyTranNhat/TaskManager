import { useEffect } from 'react';

import { Icon } from '~/components';
import ChangePassword from './ChangePassword';
import EditUserProfile from './EditProfile';

const EditProfile = ({ title }: { title: string }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
    return (
        <div className="wrapper">
            <div className="flex items-center gap-3">
                <div>
                    <Icon.UserIcon className="bg-gradient-color size-12 rounded-full p-2 text-white" />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">Cài đặt thông tin cá nhân</h1>
                    <p className="ml-1 text-xs text-gray-700/60">Quản lý thông tin cá nhân và bảo mật</p>
                </div>
            </div>
            <div className="mt-7 flex gap-10">
                <EditUserProfile title="Cài đặt thông tin cá nhân" />
                <ChangePassword />
            </div>
        </div>
    );
};

export default EditProfile;
