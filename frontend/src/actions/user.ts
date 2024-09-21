import http from '../utils/http';
import { ApiResponse, User } from '../types';

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await http.get<ApiResponse<User[]>>('/users');
  return response.data;
};

export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  const response = await http.get<ApiResponse<User>>(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
  const response = await http.patch<ApiResponse<User>>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<ApiResponse<null>> => {
  const response = await http.delete<ApiResponse<null>>(`/users/${id}`);
  return response.data;
};