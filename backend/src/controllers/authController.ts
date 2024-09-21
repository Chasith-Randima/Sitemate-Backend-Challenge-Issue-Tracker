import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/responseHandler';

const signToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user: any, statusCode: number, req: Request, res: Response): void => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    user.password = undefined;
    sendResponse(res, statusCode, "success", 'Operation successful', { token, user });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        if (!user) {
            sendResponse(res, 500, "error", 'Error signing up. Please try again.');
            return;
        }
        createSendToken(user, 201, req, res);
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            sendResponse(res, 400, "error", 'Please enter a valid email and password.');
            return;
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            sendResponse(res, 401, "error", 'Incorrect email or password.');
            return;
        }
        createSendToken(user, 200, req, res);
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};

export const logout = (req: Request, res: Response): void => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    sendResponse(res, 200, "success", 'Successfully logged out.');
};

export const protect = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            sendResponse(res, 401, "error", 'You are not logged in. Please log in to access this route.');
            return;
        }

        const decoded = <any>jwt.verify(token, process.env.JWT_SECRET!);
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            sendResponse(res, 401, "error", 'The user belonging to this token no longer exists.');
            return;
        }

        if (currentUser.changedPasswordAfter(decoded.iat)) {
            sendResponse(res, 401, "error", 'Password was recently changed. Please log in again.');
            return;
        }

        req.user = currentUser;
        next();
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};

export const restrictTo = (...roles: string[]) => {
    return (req: Request | any, res: Response, next: NextFunction): void => {
        if (!roles.includes(req.user.role)) {
            sendResponse(res, 403, "error", 'You do not have permission to perform this action.');
            return;
        }
        next();
    };
};

export const updatePassword = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            sendResponse(res, 401, "error", 'There is no user with this id. Please log in again.');
            return;
        }

        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            sendResponse(res, 401, "error", 'Your current password is incorrect.');
            return;
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        createSendToken(user, 200, req, res);
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};