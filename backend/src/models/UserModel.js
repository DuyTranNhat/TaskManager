import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Vui lòng nhập họ tên'],
            minlength: [6, 'Họ tên tối thiểu 6 ký tự'],
            maxlength: [20, 'Họ tên tối đa 20 ký tự'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Vui lòng nhập email'],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Sai định dạng email'],
        },
        passwordHash: {
            type: String,
            required: [true, 'Vui lòng nhập mật khẩu'],
            minlength: [6, 'Mật khẩu tối thiểu 6 ký tự'],
            maxlength: [20, 'Mật khẩu tối đa 20 ký tự'],
        },
    },
    { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return;

  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
