import { API_BASE_URL } from '@/constants/constants';
import Image from 'next/image';
import React, { useEffect } from 'react';

const ImageForm = ({ imageObject, submitData, setErrors, getImage }) => {
  const handleDelete = () => {
    const encodedProject = encodeURIComponent(submitData.project);
    const encodedImage = encodeURIComponent(submitData.image);
    const url = `${API_BASE_URL}?type=deleteImage&project=${encodedProject}&image=${encodedImage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getImage();
      })
      .catch((e) => console.error('Error: ', e));
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
          console.log('Request sent successfully');
          getImage();
        })
        .catch((e) => console.error('Error: ', e));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border border-[#CBCBCB] rounded-[12px] w-[550px]">
      <Image
        src={imageObject.image}
        alt="Image to categorize"
        width={200}
        height={300}
      />
      <div className="flex w-full items-center justify-between p-2">
        <button
          onClick={handleDelete}
          className="w-[220px] h-[43px] justify-center bg-red-400 rounded-md items-center inline-flex text-zinc-900 text-base font-bold"
        >
          Delete
        </button>
        <button
          onClick={handleSubmit}
          className="w-[220px] h-[43px] justify-center bg-green-400 rounded-md items-center inline-flex text-zinc-900 text-base font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ImageForm;
