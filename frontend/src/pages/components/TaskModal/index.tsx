import CreateTaskModal from './CreateTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';

type TaskModalType = {
    modalType:
        | {
              type: 'create' | 'edit' | 'delete' | undefined;
              taskId: string | undefined;
          }
        | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskModal = ({ open, setOpen, modalType }: TaskModalType) => {
    if (modalType)
        switch (modalType.type) {
            case 'create':
                return <CreateTaskModal open={open} setOpen={setOpen} />;
            case 'edit':
                return <EditTaskModal open={open} setOpen={setOpen} taskId={modalType.taskId} />;
            case 'delete':
                return <DeleteTaskModal open={open} setOpen={setOpen} taskId={modalType.taskId} />;
            default:
                throw new Error('Invalid type');
        }
};

export default TaskModal;
