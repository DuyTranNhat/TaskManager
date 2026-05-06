import React, { type ReactNode } from 'react';

import { Header, SideBar, RightBar } from '~/components';
import Container from './Container';

type Props = {
    children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="wrapper">
            <Header />
            <div className="flex bg-gray-300/10">
                <SideBar />
                <Container>{children}</Container>
                <RightBar />
            </div>
        </div>
    );
};
export default MainLayout;