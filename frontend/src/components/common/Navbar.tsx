"use client"

import Image from 'next/image';
import React, { useState ,useLayoutEffect} from 'react';
import { useRouter } from 'next/navigation';
import {getCookie} from "@/actions/auth"
import { User } from '@/types';

const Navbar: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    
    if(!getCookie("authToken")){
      router.push("/auth/login")
    
    }
}
 
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };


  useLayoutEffect(() => {
    const fetchUser = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData))
      }else{
        router.push('/auth/login'); 
      }
    };

    fetchUser();
    console.log(user)
  }, []);
  return (
    <>
    <nav className="flex items-center justify-between p-4 shadow-md bg-white">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Type to search..."
            className="pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l3.858 3.858a1 1 0 01-1.414 1.414l-3.858-3.858zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 items-center">
        <button className="w-8 h-8 bg-gray-200 rounded-full focus:outline-none" aria-label="Profile" onClick={()=>router.push(`/user/profile`)}>
          {user && user.images && user.images[0]  ?<Image
            src={ `${
              process.env.NEXT_PUBLIC_API_DEVELOPMENT
            }/users/image/${user && user.images[0]}`}
            alt="Profile Picture"
            className="rounded-full"
            width={32}
            height={32}
          />  : <Image
          src="/navbar_user_image.png"
          alt="Profile Picture"
          className="rounded-full"
          width={32}
          height={32}
        />   }
        </button>

        <div className="ml-2">
    
          
          <div className="text-sm font-medium text-gray-900 cursor-pointer"
          >{user && user.username}</div>

        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
