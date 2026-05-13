import React, { type ReactNode } from 'react';

import { Header, SideBar, RightBar } from '~/components';
import Container from './Container';
import { TaskProvider } from '~/Context';

type Props = {
    children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-300/10">
            <Header />

            <TaskProvider>
                <div className="flex">

                    {/* Sidebar */}
                    <div className="hidden md:block md:w-64">
                        <SideBar />
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 w-full">
                        <Container>{children}</Container>
                    </main>

                    {/* RightBar */}
                    <div className="hidden xl:block">
                        <RightBar />
                    </div>
                </div>
            </TaskProvider>
        </div>
    );
};

export default MainLayout;