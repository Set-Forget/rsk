import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed md:relative bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow flex items-center justify-between md:p-6 ">
      <span className="text-sm text-gray-500 sm:text-center ">
        RSK Strata Advisors
      </span>
      <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500">
        <span  className='hover:underline hover:cursor-pointer'>Logout</span>
      </ul>
    </nav>
  );
};

export default Navbar;
