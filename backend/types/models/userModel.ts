import { Document } from 'mongoose';


export interface IUser extends Document {
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    passwordConfirm: string | undefined;
    role: string;
    images?: string[];
    passwordChangedAt?: Date;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    changedPasswordAfter(JWTTimestamp: number): boolean;
}
