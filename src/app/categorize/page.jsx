'use client';
import Spinner from '@/components/Spinner/Spinner';
import CategoryForm from '@/components/categoryForm/CategoryForm';
import ImageForm from '@/components/imageForm/ImageForm';
import Navbar from '@/components/navbar/Navbar';
import { API_BASE_URL, ROLES } from '@/constants/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [project, setProject] = useState('');
  const [imageObject, setImageObject] = useState('');
  const [submitData, setSubmitData] = useState('');
  const [errors, setErrors] = useState({
    category: '',
    element: '',
    subelement: '',
    unitMeasure: '',
    unitCost: '',
    priority: '',
    comment: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedSubelement, setSelectedSubelement] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedUnitOfMeasure, setSelectedUnitOfMeasure] = useState('');
  const [selectedUnitCost, setSelectedUnitCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    const user = JSON.parse(localStorage.getItem('user'));
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('project');
    if (query && user.role == ROLES.admin) {
      setProject(query);
    } else if (query && user.assignedProjects.includes(query)) {
      setProject(query);
    } else {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    getImage();
  }, [project]);

  const handleRollback = () => {
    setSubmitData({
      ...submitData,
      category: imageObject.category,
      element: imageObject.element,
      subelement: imageObject.subelement,
      description: imageObject.description,
      unitMeasure: imageObject.unitMeasure,
      unitCost: imageObject.unitCost,
    });
    setSelectedCategory(imageObject.category);
    setSelectedElement(imageObject.element);
    setSelectedSubelement(imageObject.subelement);
    setSelectedDescription(imageObject.description);
    setSelectedUnitOfMeasure(imageObject.unitMeasure);
    setSelectedUnitCost(imageObject.unitCost);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Navbar />
      <div className="w-full flex items-center justify-between px-6 py-10">
        <Link
          href={'/'}
          className="w-[100px] h-[35px] justify-center bg-primary rounded-md items-center inline-flex text-white text-base font-semibold"
        >
          Back
        </Link>
        <div className="flex items-center gap-7">
          <button
            onClick={handleRollback}
            className="w-[50px] h-[35px] justify-center bg-primary rounded-md items-center inline-flex text-white text-base font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 transition-rotate duration-500 ease-in-out hover:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <h2 className="text-center text-2xl font-medium">
            {project + ' Categorization'}
          </h2>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <Spinner />
          <h4 className="text-base mt-4">Loading Image . . .</h4>
        </div>
      ) : (
        <main className="flex flex-col lg:flex-row gap-10 items-center justify-center p-10 bg-[#FAFAFA]">
          <ImageForm
            imageObject={imageObject}
            submitData={submitData}
            setErrors={setErrors}
            getImage={getImage}
            setSelectedCategory={setSelectedCategory}
            setSelectedElement={setSelectedElement}
            setSelectedSubelement={setSelectedSubelement}
            setSelectedDescription={setSelectedDescription}
            setSelectedUnitOfMeasure={setSelectedUnitOfMeasure}
            setSelectedUnitCost={setSelectedUnitCost}
          />
          <CategoryForm
            imageObject={imageObject}
            submitData={submitData}
            setSubmitData={setSubmitData}
            errors={errors}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            selectedSubelement={selectedSubelement}
            setSelectedSubelement={setSelectedSubelement}
            selectedDescription={selectedDescription}
            setSelectedDescription={setSelectedDescription}
            selectedUnitOfMeasure={selectedUnitOfMeasure}
            setSelectedUnitOfMeasure={setSelectedUnitOfMeasure}
            selectedUnitCost={selectedUnitCost}
            setSelectedUnitCost={setSelectedUnitCost}
          />
        </main>
      )}
    </div>
  );
};

export default Page;
