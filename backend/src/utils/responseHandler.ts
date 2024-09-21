import { Response } from 'express';
import { ResponseData } from '../types';

export const sendResponse = (
    res: Response,
    statusCode: number,
    success: string,
    message: string,
    data: any = null
): void => {
    const responseData: ResponseData = {
        status: success ? 'success' : 'error',
        message,
        data,
    };

    res.status(statusCode).json(responseData);
};