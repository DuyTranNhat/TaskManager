import type { ReactNode } from 'react';


const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-1 px-18 py-10">
            {children}
            <h1>//Task Modal</h1>
        </div>
    );
};

export default Container;
