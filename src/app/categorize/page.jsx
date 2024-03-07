'use client';
import { API_BASE_URL } from '@/constants/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {

  const [project, setProject] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('project');
    setProject(query);
  }, []);

  // useEffect(() => {
  //   fetch(API_BASE_URL + `?type=${projectImage}&project=${project}`)
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(e => console.error('Error: ', e))
  // }, []);


  return (
    <div>
      <Link  href={'/'}>back</Link>
      <h2>we are in the cateogrization page</h2>
      <p>The project selected is: {project}</p>
    </div>
  );
};

export default page;
