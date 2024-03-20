import { API_BASE_URL } from '@/constants/constants';
import Image from 'next/image';
import React, { useState } from 'react';
import Spinner from '../Spinner/Spinner';

const ImageForm = ({
  imageObject,
  submitData,
  setErrors,
  getImage,
  setSelectedCategory,
  setSelectedElement,
  setSelectedSubelement,
  setSelectedDescription,
  setSelectedUnitOfMeasure,
  setSelectedUnitCost,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    const encodedProject = encodeURIComponent(submitData.project);
    const encodedImage = encodeURIComponent(submitData.image);
    const url = `${API_BASE_URL}?type=deleteImage&project=${encodedProject}&image=${encodedImage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSelectedCategory('');
        setSelectedElement('');
        setSelectedSubelement('');
        setSelectedDescription('');
        setSelectedUnitOfMeasure('');
        setSelectedUnitCost('');
        setIsLoading(false);
        getImage();
      })
      .catch((e) => {
        setIsLoading(false);
        console.error('Error: ', e);
      });
  };

  const handleSubmit = () => {
    let newErrors = {
      category: '',
      element: '',
      subelement: '',
      unitMeasure: '',
      unitCost: '',
      priority: '',
      comment: '',
    };

    if (submitData.category === '') {
      newErrors.category = 'Please select a Category';
    }
    if (submitData.element === '') {
      newErrors.element = 'Please select an Element';
    }
    if (submitData.subelement === '') {
      newErrors.subelement = 'Please select a Subelement';
    }
    if (submitData.unitMeasure === '') {
      newErrors.unitMeasure = 'Please select a Unit of Measure';
    }
    if (submitData.unitCost === '') {
      newErrors.unitCost = 'Please introduce a Unit Cost';
    }
    if (submitData.priority === '') {
      newErrors.priority = 'Please select a Priority';
    }
    if (submitData.comment === '') {
      newErrors.comment = 'Please make a Comment';
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');

    if (!hasErrors) {
      setIsLoading(true);
      fetch(API_BASE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submitData,
          type: 'submitImage',
        }),
      })
        .then(() => {
          setSelectedCategory('');
          setSelectedElement('');
          setSelectedSubelement('');
          setSelectedDescription('');
          setSelectedUnitOfMeasure('');
          setSelectedUnitCost('');
          setIsLoading(false);
          getImage();
        })
        .catch((e) => {
          setIsLoading(false);
          console.error('Error: ', e);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border border-[#CBCBCB] rounded-[12px] w-[550px] h-[500px]">
      <div className="relative w-[550px] h-[450px]">
        <Image
          src={imageObject.image}
          alt="Image to categorize"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className="flex w-full min-w-[550px] items-center justify-between p-2">
        <button
          onClick={handleDelete}
          className="text-white bg-[#a94442] w-[220px] h-[43px] justify-center rounded-md items-center inline-flex text-base font-bold hover:bg-[#7b3230]"
        >
          Delete
        </button>

        {isLoading && <Spinner />}

        <button
          onClick={handleSubmit}
          className="text-white bg-[#3c763d] w-[220px] h-[43px] justify-center rounded-md items-center inline-flex text-base font-bold hover:bg-[#2a5530]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ImageForm;
