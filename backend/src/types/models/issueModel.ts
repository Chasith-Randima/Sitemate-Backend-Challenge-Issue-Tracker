import { Document } from 'mongoose';

export interface IIssue extends Document {
    issueNumber: string;
    title: string;
    description: string;
}
