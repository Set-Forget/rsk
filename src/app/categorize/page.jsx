'use client';
import Spinner from '@/components/Spinner/Spinner';
import CategoryForm from '@/components/categoryForm/CategoryForm';
import ImageForm from '@/components/imageForm/ImageForm';
import { API_BASE_URL } from '@/constants/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [project, setProject] = useState('');
  const [imageObject, setImageObject] = useState('');
  const [submitData, setSubmitData] = useState('');
  const [errors, setErrors] = useState({
    category: '',
    element: '',
    subelement: '',
    priority: '',
    comment: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const getImage = () => {
    if (project) {
      setIsLoading(true);
      fetch(API_BASE_URL + `?type=projectImage&project=${project}`)
        .then((res) => res.json())
        .then((data) => {
          setImageObject(data);
          setSubmitData({
            ...data,
            priority: '',
            comment: '',
            project,
          });
          setIsLoading(false);
        })
        .catch((e) => {
          console.error('Error: ', e);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('project');
    setProject(query);
  }, []);

  useEffect(() => {
    getImage();
  }, [project]);

  return (
    <div className="bg-[#FAFAFA] h-screen">
      <div className="w-full flex items-center p-10">
        <Link
          href={'/'}
          className="w-[100px] h-[35px] justify-center bg-amber-500 rounded-md items-center inline-flex text-white text-base font-bold"
        >
          Back
        </Link>
      </div>
      <h2 className="text-center text-2xl my-8 font-medium">
        {project + ' Categorization'}
      </h2>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <Spinner />
          <h4 className="text-base mt-4">Loading Image . . .</h4>
        </div>
      ) : (
        <main className="flex flex-col md:flex-row gap-10 items-center justify-center p-10">
          <ImageForm
            imageObject={imageObject}
            submitData={submitData}
            setErrors={setErrors}
            getImage={getImage}
          />
          <CategoryForm
            imageObject={imageObject}
            submitData={submitData}
            setSubmitData={setSubmitData}
            errors={errors}
          />
        </main>
      )}
    </div>
  );
};

export default page;
