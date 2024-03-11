import { API_BASE_URL } from '@/constants/constants';
import Image from 'next/image';
import React, { useEffect } from 'react';

const ImageForm = ({ imageObject, submitData, setErrors, getImage }) => {
  const handleDelete = () => {
    console.log('request to delete photo');
  };

  const handleSubmit = () => {
    let newErrors = {
      category: '',
      element: '',
      subelement: '',
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
    <div>
      <Image
        src={imageObject.image}
        alt="Image to categorize"
        width={200}
        height={300}
      />
      <button onClick={handleDelete} className="border border-red-600">
        Delete
      </button>
      <button onClick={handleSubmit} className="border border-green-600">
        Submit
      </button>
    </div>
  );
};

export default ImageForm;
