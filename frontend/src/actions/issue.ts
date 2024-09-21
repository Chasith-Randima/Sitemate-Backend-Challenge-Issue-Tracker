import http from '../utils/http';
import { ApiResponse, Issue, IssueRequest ,ApiResponseWithPagination} from '../types';

export const getAllIssues = async (page: number = 1, limit: number = 9): Promise<ApiResponseWithPagination> => {
  const response = await http.get<ApiResponseWithPagination>(`/issues?page=${page}&limit=${limit}`);
  return response.data;
};

export const getIssueById = async (id: string): Promise<ApiResponse<Issue>> => {
  const response = await http.get<ApiResponse<Issue>>(`/issues/${id}`);
  return response.data;
};

export const createIssue = async (data: IssueRequest): Promise<ApiResponse<Issue>> => {
  const response = await http.post<ApiResponse<Issue>>('/issues', data);
  return response.data;
};

export const updateIssue = async (id: string, data: Partial<IssueRequest>): Promise<ApiResponse<Issue>> => {
  const response = await http.patch<ApiResponse<Issue>>(`/issues/${id}`, data);
  return response.data;
};

export const deleteIssue = async (id: string): Promise<ApiResponse<null>> => {
  const response = await http.delete<ApiResponse<null>>(`/issues/${id}`);
  return response.data;
};