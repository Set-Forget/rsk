'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    // Clear the user cookie
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('user');
    // Redirect to the login page
    router.push('/auth/login');
  };
  return (
    <nav className="fixed md:relative bottom-0 left-0 z-20 w-full bg-primary border-gray-200 shadow flex items-center justify-between p-2 md:py-3 md:px-6 ">
      <div className="flex flex-col items-start">
        {user && (
          <>
            <span className="text-xs text-[#BAB8B8] sm:text-center ">
              Welcome,
            </span>
            <span className="text-sm text-white sm:text-center mt-1">
              {user?.name + ' ' + user?.lastname}
            </span>
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center text-sm font-medium text-white hover:cursor-pointer hover:text-[#BAB8B8]">
        <button onClick={logout} className=" flex items-center">
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
