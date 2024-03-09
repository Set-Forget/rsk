'use client';
import CategoryForm from '@/components/categoryForm/CategoryForm';
import ImageForm from '@/components/imageForm/ImageForm';
import { API_BASE_URL } from '@/constants/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [project, setProject] = useState('');
  const [imageObject, setImageObject] = useState('');
  const [submitData, setSubmitData] = useState('');
  // falta el manejo de errores
  const [errors, setErrors] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('project');
    setProject(query);
  }, []);

  useEffect(() => {
    if (project) {
      fetch(API_BASE_URL + `?type=projectImage&project=${project}`)
        .then((res) => res.json())
        .then((data) => {
          setImageObject(data);
          setSubmitData({
            ...data,
            priority: '',
            comment: '',
          });
        })
        .catch((e) => console.error('Error: ', e));
    }
  }, [project]);

  return (
    <div>
      <Link href={'/'}>back</Link>
      <h2>we are in the cateogrization page</h2>
      <p>The project selected is: {project}</p>

      <ImageForm imageObject={imageObject} submitData={submitData} />
      <CategoryForm imageObject={imageObject} setSubmitData={setSubmitData} />
    </div>
  );
};

export default page;
