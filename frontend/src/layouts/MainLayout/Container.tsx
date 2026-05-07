import type { ReactNode } from 'react';
import { useTasks } from '~/Context';
import { TaskModal } from '~/pages/components';


const Container = ({ children }: { children: ReactNode }) => {
   const { TaskModalHandler } = useTasks();
    return (
        <div className="flex-1 px-18 py-10">
            {children}
             <TaskModal
                open={TaskModalHandler.getOpen()}
                setOpen={TaskModalHandler.setOpen}
                modalType={TaskModalHandler.getType()}
            />
        </div>
    );
};

export default Container;
