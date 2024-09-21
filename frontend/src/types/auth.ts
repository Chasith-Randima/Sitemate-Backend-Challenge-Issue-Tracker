export interface SignUpRequest {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
  
export interface LoginRequest {
    email: string;
    password: string;
  }