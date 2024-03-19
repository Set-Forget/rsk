import LoginForm from '@/components/loginForm/LoginForm';
import Image from 'next/image';
import React from 'react';

const Page = () => {
  return (
    <div className="w-full h-screen grid grid-cols-2">
      <div className="relative">
        <Image
          src={
            'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt="RSK building image"
          fill
          priority
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-5 text-center">Welcome Back!</h2>
        <div className="rounded-xl shadow-xl p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
