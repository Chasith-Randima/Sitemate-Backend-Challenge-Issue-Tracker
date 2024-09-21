'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/actions/auth';
import { ApiResponse, SignUpRequest,User } from '@/types';
import Link from 'next/link';
import Spinner from '@/components/common/Spinner';
import NotificationModal from '@/components/models/NotificationModel';

interface SignUpResponse extends ApiResponse<{ token: string; user: User }> {}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignUpRequest>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true)

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false)
      return;
    }

    try {
      const response: SignUpResponse = await signup(formData);
      if (response.status === 'success') {
        setSuccess("Sign Uped Successfully...")
        router.push('/auth/login');
      } else {
        setError(response.message || 'An unknown error occurred');
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }finally{
        setLoading(false)
    }
  };

  return (
    <>
      {loading && (
        <div className="h-full absolute inset-0 z-50 flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      {error && <NotificationModal   isVisible={true} message={error} type='error' onClose={()=>{setError("")}}/>}
      {success && <NotificationModal   isVisible={true} message={"Successfully SignUped!"} type='success' onClose={()=>{setSuccess("")}}/>}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="flex w-3/4 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-2 bg-white">
          <div className="w-full max-w-md">
            <Link href="/" className="flex items-center justify-center space-x-2 rounded-full p-2 mx-auto mb-10">
              <span className="text-2xl font-bold text-blue-600">Sitemate</span>
              <span className="text-lg text-blue-200">Issue Tracker</span>
            </Link>
            
            <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
            
            <form onSubmit={handleSignup}>
              {error && (
                <div className="mb-4 text-red-500">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="6+ Characters, 1 Capital letter"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
              >
                Sign Up
              </button>
            </form>
            
            <p className="text-center text-gray-500">
              Already have an account? <Link href="/auth/login" className="text-blue-600">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
