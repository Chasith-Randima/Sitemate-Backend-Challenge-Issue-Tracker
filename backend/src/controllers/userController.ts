import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { sendResponse } from '../utils/responseHandler';

export const searchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;

        if (search) {
            const data = await User.find({
                $or: [{ username: { $regex: search, $options: 'i' } }],
            });

            sendResponse(res, 200, "success", `${data.length} found...`,data);
        } else {
            sendResponse(res, 400, "error",  'Search term cannot be empty',null);
        }
    } catch (err: any) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        sendResponse(res, 200, "success", 'Users fetched successfully', users);
    } catch (err: any) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const getOneUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            sendResponse(res, 404, "error",  'User not found',null);
            return;
        }
        sendResponse(res, 200, "success",  'User fetched successfully',user);
    } catch (err: any) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await User.create(req.body);
        sendResponse(res, 201, "success",  'User created successfully',newUser);
    } catch (err: any) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true,
        });
        if (!updatedUser) {
            sendResponse(res, 404, "error",  'User not found',null);
            return;
        }
        sendResponse(res, 200, "success",  'User updated successfully',updatedUser);
    } catch (err: any) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            sendResponse(res, 404, "error", 'User not found',null);
            return;
        }
        sendResponse(res, 204, "success",  'User deleted successfully',null);
    } catch (err: any) {
        sendResponse(res, 500, "error", err.message);
    }
};