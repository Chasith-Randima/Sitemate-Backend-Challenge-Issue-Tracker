export interface Issue {
    _id: string;
    issueNumber: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

export interface IssueRequest {
    _id?:string,
    issueNumber: string;
    title: string;
    description: string;
}
