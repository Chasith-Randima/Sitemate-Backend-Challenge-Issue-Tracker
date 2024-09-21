import http from '../utils/http';
import { ApiResponse, User, SignUpRequest, LoginRequest } from '../types';
import cookie from 'js-cookie';

export const signup = async (data: SignUpRequest): Promise<ApiResponse<{ token: string, user: User }>> => {
  const response = await http.post<ApiResponse<{ token: string, user: User }>>('/users/signup', data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<ApiResponse<{ token: string, user: User }>> => {
  const response = await http.post<ApiResponse<{ token: string, user: User }>>('/users/login', data);

  const token = response.data.data.token;
  const user = response.data.data.user;
  
  setCookie('authToken', token);
  setLocalStorage('user', user);

  return response.data;
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await http.get<ApiResponse<null>>('/users/logout');
  return response.data;
};

interface AuthResponse {
  token: string;
  data: any;
}

export const setCookie = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key: string): void => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string): string | undefined => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
  return undefined;
};

export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data: AuthResponse, user: string, next: () => void): void => {
  if (user === "user") {
    setCookie("authToken", data.token);
    setLocalStorage(user, data.data);
  }
  next();
};

export const isAuth = (user: string): any | false => {
  if (typeof window !== "undefined") {
    let cookieChecked: string | undefined;
    
    if (user === "organization") {
      cookieChecked = getCookie("token_org");
    }

    if (cookieChecked) {
      const localStorageItem = localStorage.getItem(user);
      if (localStorageItem) {
        return JSON.parse(localStorageItem);
      } else {
        return false;
      }
    }
  }
  return false;
};