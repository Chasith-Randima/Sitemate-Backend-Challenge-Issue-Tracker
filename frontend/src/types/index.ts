export * from "./issue"
export * from "./auth"
export * from "./user"
import { Issue } from "./issue";

export interface ApiResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T;
  }


export interface ApiResponseWithPagination {
  status: 'success' | 'error';
  message: string;
  data: {
    issues: Issue[];
    totalIssues: number;
  };
}
