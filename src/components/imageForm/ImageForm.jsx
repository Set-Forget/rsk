import Image from 'next/image';
import React from 'react';

const ImageForm = ({ imageObject, submitData }) => {
    
    const handleSubmit = () => {
      console.log(submitData)
    }
    

  return (
    <div>
      <Image
        src={imageObject.image}
        alt="Image to categorize"
        width={200}
        height={300}
      />
      <button>Delete</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ImageForm;
