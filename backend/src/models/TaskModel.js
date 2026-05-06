import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Thiếu userId'],
        },
        title: {
            type: String,
            required: [true, 'Vui lòng nhập tiêu đề'],
            minlength: [6, 'Tiêu đề tối thiểu 6 ký tự'],
            maxlength: [200, 'Tiêu đề tối đa 200 ký tự'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Vui lòng nhập mô tả'],
            minlength: [6, 'Mô tả tối thiểu 6 ký tự'],
            maxlength: [600, 'Mô tả tối đa 600 ký tự'],
        },
        status: {
            type: String,
            enum: {
                values: ['Todo', 'InProgress', 'Completed'],
                message: 'Trạng thái không hợp lệ',
            },
            required: [true, 'Vui lòng chọn trạng thái'],
            default: 'Todo',
        },
        priority: {
            type: String,
            enum: {
                values: ['Low', 'Normal', 'High'],
                message: 'Độ ưu tiên không hợp lệ',
            },
            required: [true, 'Vui lòng chọn độ ưu tiên'],
            default: 'Normal',
        },
        dueDate: {
            type: Date,
            required: [true, 'Vui lòng chọn hạn chót'],
            validate: {
                validator: function (value) {
                    return value instanceof Date && !isNaN(value.getTime());
                },
                message: 'Ngày không hợp lệ',
            },
        },
    },
    { timestamps: true },
);

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;
