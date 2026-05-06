import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Icon, TippyTrigger } from '~/components';
import config from '~/config';
import { UserProfile, LogoutModal } from './UserProfile';

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="sticky top-0 right-0 left-0 z-100 flex justify-between bg-white px-30 py-5 shadow-sm">
            <Link to={config.routes.dashboard}>
                <div className="flex items-center justify-center">
                    <div className="bg-gradient-color inline-block rounded-xl p-2">
                        <Icon.LogoIcon className="text-white" />
                    </div>

                    <span className="bg-gradient-color ml-2 bg-clip-text text-2xl font-bold text-transparent">
                        Task Manager
                    </span>
                </div>
            </Link>
            <div className="flex items-center justify-center">
                <Tippy content="Settings" placement="bottom" delay={[0, 200]} offset={[0, 15]}>
                    <TippyTrigger>
                        <Link to={config.routes.editProfile}>
                            <Icon.SettingIcon className="hover:text-main cursor-pointer transition-transform duration-300 hover:rotate-45" />
                        </Link>
                    </TippyTrigger>
                </Tippy>

                <UserProfile setOpen={setOpen} />
                <LogoutModal open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default Header;
