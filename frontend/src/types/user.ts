export interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    images?: string[];
    passwordChangedAt?: Date;
  }