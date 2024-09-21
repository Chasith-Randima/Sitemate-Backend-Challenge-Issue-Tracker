import mongoose, { Schema } from 'mongoose';
import { IIssue } from '../types';

const issueSchema: Schema = new mongoose.Schema(
    {
        issueNumber: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Issue = mongoose.model<IIssue>('Issue', issueSchema);

export default Issue;