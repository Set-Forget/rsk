'use client';
import { API_BASE_URL } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    '; path=/';
};

const LoginForm = () => {
  const [submitData, setSubmitData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({ ...submitData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {
      email: '',
      password: '',
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!submitData.email || !emailRegex.test(submitData.email)) {
      newErrors.email = 'Please, introduce a valid email';
    }
    if (!submitData.password) {
      newErrors.password = 'Please, introduce a valid password';
    }
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      submitData.type = 'login';
      fetch(API_BASE_URL, {
        redirect: 'follow',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            //   Store user credentials in a cookie
            setCookie('user', JSON.stringify(data.data.id), 7); // Expires in 7 days
            localStorage.setItem('user', JSON.stringify(data.data)); // local storage
            router.push('/');
          } else {
            console.error('Login failed');
          }
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[350px] mx-auto" noValidate>
      <h3 className="self-start font-semibold text-xl mb-5">
        Sign in to your account
      </h3>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
            errors.email ? 'border-red-600' : null
          }`}
          placeholder="name@example.com"
        />
        {errors.email && (
          <span className="text-xs text-red-600 ml-2 mt-1">{errors.email}</span>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
            errors.password ? 'border-red-600' : null
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <span className="text-xs text-red-600 ml-2 mt-1">
            {errors.password}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-primary hover:bg-hover-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
