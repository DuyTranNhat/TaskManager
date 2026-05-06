import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import { Icon, TippyTrigger } from '~/components';
import { Status, type Task } from '~/Models';

type Props = {
    task: Task;
    setEditModal: (taskId: string) => void;
    setDeleteModal: (taskId: string) => void;
};

const TaskItem = ({ task, setEditModal, setDeleteModal }: Props) => {
    const [visibleTaskId, setVisibleTaskId] = useState<string | null>(null);
    const handleOpenEditModal = () => {
        setVisibleTaskId(null);
        setEditModal(task.taskId);
    };
    const handleOpenDeleteModal = () => {
        setVisibleTaskId(null);
        setDeleteModal(task.taskId);
    };
    return (
        <div key={task.taskId} className="mt-8 rounded-2xl border-l-3 border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <div
                    className={`mt-2 size-4 rounded-full ${task.status === Status.Completed ? 'bg-green-700' : 'bg-orange-400'}`}
                ></div>
                <div>
                    <h1
                        className={`text-lg font-semibold ${task.status === Status.Completed ? 'text-gray-400 line-through' : ''} `}
                    >
                        {task.title}
                    </h1>
                    <p className="text-sm text-gray-500">{task.description}</p>
                </div>
                <div
                    className={`tex-xs rounded-xl p-2 text-xs ${task.status === Status.Completed ? 'bg-green-300/30' : 'bg-orange-300/30'} p-1`}
                >
                    {task.status}
                </div>
            </div>
            <div className="flex flex-col items-end gap-4">
                <HeadlessTippy
                    key={task.taskId}
                    interactive
                    visible={task.taskId === visibleTaskId}
                    onClickOutside={() => setVisibleTaskId(null)}
                    placement="bottom-end"
                    appendTo={document.body}
                    render={(attr) => (
                        <div
                            className="w-40 rounded-lg border border-gray-200/40 bg-white text-xs shadow-md"
                            tabIndex={-1}
                            {...attr}
                        >
                            <div
                                onClick={handleOpenEditModal}
                                className="hover:bg-main/3 cursor-pointer rounded-tl-lg rounded-tr-lg px-4 py-2"
                            >
                                <Icon.EditIcon className="text-main mr-1 mb-1 inline-block size-4" />
                                <span className="font-light">Chỉnh sửa</span>
                            </div>
                            <div
                                onClick={handleOpenDeleteModal}
                                className="hover:bg-main/3 cursor-pointer rounded-br-lg rounded-bl-lg px-4 py-2"
                            >
                                <Icon.DeleteIcon className="mr-1 mb-1 inline-block size-4 text-red-500" />
                                <span className="font-light">Xóa</span>
                            </div>
                        </div>
                    )}
                >
                    <TippyTrigger>
                        <span
                            className="cursor-pointer"
                            onClick={() => setVisibleTaskId(visibleTaskId === task.taskId ? null : task.taskId)}
                        >
                            <Icon.EllipsisIcon />
                        </span>
                    </TippyTrigger>
                </HeadlessTippy>
                <div className="inline-block text-left">
                    <div className="text-xs font-semibold text-gray-700">
                        <Icon.CalendarIcon className="mr-1 mb-1 inline-block size-4" />
                        <span>
                            Tháng {task.dueDate.getMonth() + 1} / {task.dueDate.getDate()}
                        </span>
                    </div>
                    <div className="text-xs text-gray-500">
                        <Icon.ClockIcon className="mr-1 mb-1 inline-block size-4" />
                        <span>
                            Ngày tạo {task.createdAt.getDate()}/{task.createdAt.getMonth() + 1}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
