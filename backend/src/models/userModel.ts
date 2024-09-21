import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';

const userSchema: Schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please tell us your Username'],
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Please tell us your Email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid Email address..'],
        },
        password: {
            type: String,
            required: [true, 'Please provide a valid Password..'],
            minlength: 8,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your Password..'],
            validate: {
                validator: function (this: IUser, el: string) {
                    return el === this.password;
                },
                message: 'Passwords are not the same',
            },
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        images: [String],
        passwordChangedAt: Date,
    },
    { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    this.passwordChangedAt = new Date(Date.now() - 2000);
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
        const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;