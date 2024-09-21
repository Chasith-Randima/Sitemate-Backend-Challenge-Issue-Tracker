import { Request, Response } from 'express';
import Issue from '../models/issueModel';
import { sendResponse } from '../utils/responseHandler';

export const getAllIssues = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;
  
    try {
        const totalIssues = await Issue.countDocuments();
        const issues = await Issue.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
      
        sendResponse(res, 200, "success", 'Issues retrieved successfully', { issues, totalIssues });
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};

  
export const getIssueById = async (req: Request, res: Response): Promise<void> => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            sendResponse(res, 404, "error", 'Issue not found');
            return;
        }
        sendResponse(res, 200, "success", 'Issue retrieved successfully', issue);
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};

export const createIssue = async (req: Request, res: Response): Promise<void> => {
    try {
        const newIssue = new Issue(req.body);
        await newIssue.save();
        sendResponse(res, 201, "success", 'Issue created successfully', newIssue);
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};

export const updateIssue = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIssue) {
            sendResponse(res, 404, "error", 'Issue not found');
            return;
        }
        sendResponse(res, 200, "success", 'Issue updated successfully', updatedIssue);
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};

export const deleteIssue = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
        if (!deletedIssue) {
            sendResponse(res, 404, "error", 'Issue not found');
            return;
        }
        sendResponse(res, 200, "success", 'Issue deleted successfully');
    } catch (error: any) {
        sendResponse(res, 500, "error", error.message);
    }
};