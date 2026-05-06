import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Modal, Icon } from '~/components';
import { Status, Priority, type UpdateTaskRequest } from '~/Models';
import { useTasks } from '~/Context';
import { useEffect } from 'react';

const validateSchema = yup.object({
    title: yup.string().required('Vui lòng nhập tiêu đề').min(6, 'Tối thiểu 6 ký tự!').max(200, 'Tối đa 200 ký tự'),
    description: yup.string().required('Vui lòng nhập mô tả').min(6, 'Tối thiểu 6 ký tự!').max(600, 'Tối đa 600 ký tự'),
    status: yup
        .mixed<Status>()
        .oneOf(Object.values(Status), 'Trạng thái không hợp lệ')
        .required('Vui lòng chọn trạng thái'),
    priority: yup
        .mixed<Priority>()
        .oneOf(Object.values(Priority), 'Độ ưu tiên không hợp lệ')
        .required('Vui lòng chọn độ ưu tiên'),
    dueDate: yup
        .string()
        .required('Vui lòng chọn hạn chót')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Ngày không hợp lệ'),
});

const EditTaskModal = ({
    open,
    setOpen,
    taskId,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    taskId: string | undefined;
}) => {
    const { updateTask, getTask } = useTasks();
    const task = getTask(taskId as string);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateTaskRequest>({
        resolver: yupResolver(validateSchema),
    });

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
            });
        }
    }, [task, reset]);

    const handleCloseModal = () => {
        reset();
        setOpen(false);
    };

    const onSubmit = (form: UpdateTaskRequest) => {
        if (taskId) {
            updateTask(taskId, form);
            handleCloseModal();
        }
    };

    return (
        <Modal open={open} onClose={handleCloseModal}>
            <div className="w-100 p-2">
                <div className="flex items-center">
                    <div className="flex-1">
                        <Icon.EditIcon className="text-main border-main mr-1 mb-1 inline-block size-5 rounded-full border p-1" />
                        <span className="text-lg font-semibold">Chỉnh sửa task</span>
                    </div>
                    <button onClick={() => setOpen(false)}>
                        <Icon.CloseIcon className="size-8 cursor-pointer rounded-full p-2 text-gray-500 hover:bg-gray-300/30" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-6">
                        {/* Tiêu đề */}
                        <div className="mb-3">
                            <p className="mb-1 text-sm font-semibold">Tiêu đề task</p>
                            <input
                                type="text"
                                spellCheck={false}
                                {...register('title')}
                                className="w-full rounded-md p-2 pl-3 text-sm outline-1 outline-gray-300"
                                placeholder="Nhập tiêu đề"
                            />
                            {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                        </div>

                        {/* Mô tả */}
                        <div className="mb-3">
                            <p className="mb-1 text-sm font-semibold">
                                <Icon.BarIcon className="text-main mr-1 mb-1 inline-block" />
                                <span>Mô tả</span>
                            </p>
                            <textarea
                                spellCheck={false}
                                {...register('description')}
                                className="w-full rounded-md p-2 pl-3 text-sm outline-1 outline-gray-300"
                                placeholder="Thêm mô tả cho task của bạn"
                            />
                            {errors.description && (
                                <span className="text-xs text-red-500">{errors.description.message}</span>
                            )}
                        </div>

                        {/* Ưu tiên + hạn chót */}
                        <div className="mb-3 flex items-center gap-4">
                            <div className="flex-1">
                                <p className="mb-1 text-sm font-semibold">
                                    <Icon.FlagIcon className="text-main mr-1 mb-1 inline-block size-5" />
                                    <span>Độ ưu tiên</span>
                                </p>
                                <select
                                    {...register('priority')}
                                    className="h-8 w-full rounded-lg border border-gray-200 px-3 py-1 text-sm"
                                >
                                    <option value={Priority.Low}>Thấp</option>
                                    <option value={Priority.Normal}>Vừa</option>
                                    <option value={Priority.High}>Cao</option>
                                </select>
                                {errors.priority && (
                                    <span className="text-xs text-red-500">{errors.priority.message}</span>
                                )}
                            </div>

                            <div className="flex-1">
                                <p className="mb-1 text-sm font-semibold">
                                    <Icon.CalendarIcon className="text-main mr-1 mb-1 inline-block size-5" />
                                    <span>Hạn chót</span>
                                </p>
                                <input
                                    type="date"
                                    {...register('dueDate')}
                                    className="h-8 w-full rounded-lg border border-gray-200 px-3 text-sm"
                                />
                                {errors.dueDate && (
                                    <span className="text-xs text-red-500">{errors.dueDate.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Trạng thái */}
                        <div>
                            <div>
                                <Icon.CompletedIcon className="text-main mr-1 mb-1 inline-block size-5" />
                                <span className="text-sm font-bold">Trạng thái</span>
                            </div>
                            <div className="mt-1 ml-[3px] text-sm">
                                <label>
                                    <input
                                        type="radio"
                                        value={Status.InProgress}
                                        {...register('status')}
                                        className="accent-main"
                                    />{' '}
                                    Chờ xử lý
                                </label>
                                <label className="mr-3">
                                    <input
                                        type="radio"
                                        value={Status.Completed}
                                        {...register('status')}
                                        className="accent-main ml-3"
                                    />{' '}
                                    Hoàn tất
                                </label>
                            </div>
                            {errors.status && <span className="text-xs text-red-500">{errors.status.message}</span>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="bg-gradient-color mt-4 w-full cursor-pointer rounded-lg p-2 text-center text-white opacity-85 hover:opacity-100"
                        >
                            <Icon.EditIcon className="mr-2 mb-1 inline-block rounded-full border border-white p-1 text-white" />
                            <span>Cập nhật task</span>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditTaskModal;
