import { Modal, Icon } from '~/components';
import { useTasks } from '~/Context';

const DeleteTaskModal = ({
    open,
    setOpen,
    taskId,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    taskId: string | undefined;
}) => {
    const { getTask, deleteTask } = useTasks();
    const task = getTask(taskId as string);
    const handleDeleteTask = () => {
        if (taskId) {
            deleteTask(taskId);
            setOpen(false);
        }
    };
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col items-center gap-2">
                <Icon.DeleteIcon className="bg-gradient-color size-16 rounded-full p-3 text-white" />
                <h1 className="text-lg font-bold">Xác nhận xóa Task</h1>
                <p className="text-sm">
                    Bạn có chắc muốn xóa task <span className="text-sm font-bold">{task?.title}</span>?
                </p>
                <div className="text-md mt-1 flex w-50 font-bold">
                    <button
                        className="bg-gradient-color flex-1 cursor-pointer rounded-tl-2xl rounded-bl-2xl py-1 opacity-85 hover:opacity-100"
                        onClick={handleDeleteTask}
                    >
                        Có
                    </button>
                    <button
                        className="flex-1 cursor-pointer rounded-tr-2xl rounded-br-2xl bg-gray-300 py-1 opacity-85 hover:opacity-100"
                        onClick={() => setOpen(false)}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteTaskModal;
