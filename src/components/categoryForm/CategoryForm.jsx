import { API_BASE_URL } from '@/constants/constants';
import React, { useEffect, useState } from 'react';

const CategoryForm = ({
  imageObject,
  submitData,
  setSubmitData,
  errors,
  selectedCategory,
  setSelectedCategory,
  selectedElement,
  setSelectedElement,
  selectedSubelement,
  setSelectedSubelement,
  selectedDescription,
  setSelectedDescription,
  selectedUnitOfMeasure,
  setSelectedUnitOfMeasure,
  selectedUnitCost,
  setSelectedUnitCost,
}) => {
  const [categories, setCategories] = useState({});
  const [descriptions, setDescriptions] = useState([]);
  const [isLoadingDescriptions, setIsLoadingDescriptions] = useState(false);

  const [showTempCategory, setShowTempCategory] = useState(true);

  useEffect(() => {
    fetch(API_BASE_URL + '?type=getAllCategories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setTimeout(() => {
          setShowTempCategory(false);
        }, 1000);
      })
      .catch((e) => console.error('Error: ', e));
  }, []);

  useEffect(() => {
    if (imageObject) {
      setSelectedCategory(imageObject.category || '');
      setSelectedElement(imageObject.element || '');
      setSelectedSubelement(imageObject.subelement || '');
      setSelectedDescription(imageObject.description || '');
      setSelectedUnitOfMeasure(imageObject.unitMeasure || '');
      setSelectedUnitCost(imageObject.unitCost || '');
    }
  }, [imageObject]);

  useEffect(() => {
    if (!selectedSubelement) return;
    setIsLoadingDescriptions(true);
    fetch(
      API_BASE_URL + `?type=getDescription&subelement=${selectedSubelement}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDescriptions(data);
        setIsLoadingDescriptions(false);
      })
      .catch((e) => {
        console.error('Error: ', e);
        setIsLoadingDescriptions(false);
      });
  }, [selectedSubelement]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSelectedElement('');
    setSelectedSubelement('');
    setSelectedDescription('');
    setSubmitData({
      ...submitData,
      category: newCategory,
      element: '',
      subelement: '',
      description: '',
    });
    console.log('updated category');
  };

  const handleElementChange = (e) => {
    const newElement = e.target.value;
    setSelectedElement(newElement);
    setSelectedSubelement('');
    setSelectedDescription('');
    setSubmitData((prevSubmitData) => ({
      ...prevSubmitData,
      element: newElement,
      subelement: '',
      description: '',
    }));
  };

  const handleSubelementChange = (e) => {
    const newSubelement = e.target.value;
    setSelectedSubelement(newSubelement);
    setSelectedDescription('');
    setSubmitData((prevSubmitData) => ({
      ...prevSubmitData,
      subelement: newSubelement,
      description: '',
    }));
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setSelectedDescription(newDescription);
    setSubmitData((prevSubmitData) => ({
      ...prevSubmitData,
      description: newDescription,
    }));
  };

  const handleUnitMeasureChange = (e) => {
    const newUnitMeasure = e.target.value;
    setSelectedUnitOfMeasure(newUnitMeasure);
    setSubmitData((prevSubmitData) => ({
      ...prevSubmitData,
      unitMeasure: newUnitMeasure,
    }));
  };

  const handleUnitCostSelected = (e) => {
    const newUnitCost = e.target.value;
    setSelectedUnitCost(newUnitCost);
    setSubmitData((prevSubmitData) => ({
      ...prevSubmitData,
      unitCost: newUnitCost,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col h-[500px] justify-between w-[550px]">
      <div className="flex flex-col">
        <select
          name="category"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className={`${
            errors.category !== '' ? 'border-red-700' : 'border-stone-300'
          } px-3 py-2.5 bg-transparent rounded-[12px] border justify-between items-center inline-flex text-neutral-500 text-base font-semibold hover:text-white hover:bg-primary focus:outline-primary`}
        >
          {selectedCategory == imageObject.category && showTempCategory && (
            <option value="">{imageObject.category}</option>
          )}
          {selectedCategory == '' && (
            <option value="">Select a category</option>
          )}
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-xs text-red-700 mt-1 ml-4">
            errors.category
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <select
          name="element"
          onChange={handleElementChange}
          value={selectedElement}
          disabled={!selectedCategory}
          className={`${
            errors.element !== '' ? 'border-red-700 ' : 'border-stone-300'
          } px-3 py-2.5 bg-transparent rounded-[12px] border justify-between items-center inline-flex text-neutral-500 text-base font-semibold hover:text-white hover:bg-primary focus:outline-primary`}
        >
          {selectedElement == imageObject.element && showTempCategory && (
            <option value="">{imageObject.element}</option>
          )}
          {selectedElement == '' && <option value="">Select an element</option>}
          {selectedCategory &&
            Object.keys(categories[selectedCategory] || {}).map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
        </select>
        {errors.element && (
          <span className="text-xs text-red-700 mt-1 ml-4">
            {errors.element}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <select
          name="subelement"
          onChange={handleSubelementChange}
          value={selectedSubelement}
          disabled={!selectedElement}
          className={`${
            errors.subelement !== '' ? 'border-red-700 ' : 'border-stone-300'
          } px-3 py-2.5 bg-transparent rounded-[12px] border justify-between items-center inline-flex text-neutral-500 text-base font-semibold hover:text-white hover:bg-primary focus:outline-primary`}
        >
          {selectedSubelement == imageObject.subelement && showTempCategory && (
            <option value="">{imageObject.subelement}</option>
          )}
          {selectedSubelement == '' && (
            <option value="">Select a subelement</option>
          )}
          {selectedElement &&
            (categories[selectedCategory]?.[selectedElement] || []).map(
              (subelement) => (
                <option key={subelement} value={subelement}>
                  {subelement}
                </option>
              )
            )}
        </select>
        {errors.subelement && (
          <span className="text-xs text-red-700 mt-1 ml-4">
            {errors.subelement}
          </span>
        )}
      </div>

      <select
        name="description"
        onChange={handleDescriptionChange}
        value={selectedDescription}
        disabled={!selectedSubelement}
        className="px-3 py-2.5 bg-transparent rounded-[12px] border border-stone-300 justify-between items-center inline-flex text-neutral-500 text-base font-semibold hover:text-white hover:bg-primary focus:outline-primary"
      >
        {selectedDescription == '' && (
          <option value="">Select a description</option>
        )}
        {isLoadingDescriptions && (
          <option value={imageObject.description}>
            {imageObject.description}
          </option>
        )}
        {selectedSubelement &&
          descriptions.map((description) => {
            return (
              <option key={description} value={description}>
                {description}
              </option>
            );
          })}
      </select>

      <div className="flex flex-col">
        <select
          name="unitMeasure"
          id="unitMeasure"
          onChange={handleUnitMeasureChange}
          value={selectedUnitOfMeasure}
          className={`${
            errors.unitMeasure !== '' ? 'border-red-700 ' : 'border-stone-300'
          } px-3 py-2.5 bg-transparent rounded-[12px] border justify-between items-center inline-flex text-neutral-500 text-base font-semibold hover:text-white hover:bg-primary focus:outline-primary`}
        >
          <option value="">Select a Unit of Measure</option>
          <option value="LF">LF</option>
          <option value="Each">Each</option>
          <option value="SF">SF</option>
          <option value="VLF">VLF</option>
          <option value="Opening">Opening</option>
          <option value="Unit">Unit</option>
          <option value="Flight">Flight</option>
          <option value="Floor">Floor</option>
          <option value="CF">CF</option>
          <option value="Total">Total</option>
          <option value="KW">KW</option>
          <option value="CAR">CAR</option>
          <option value="LF Rise">LF Rise</option>
          <option value="BF">BF</option>
          <option value="Car">Car</option>
        </select>
        {errors.unitMeasure && (
          <span className="text-xs text-red-700 mt-1 ml-4">
            {errors.unitMeasure}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          name="unitCost"
          id="unitCost"
          type="number"
          onChange={handleUnitCostSelected}
          value={selectedUnitCost}
          placeholder="Introduce a Unit Cost"
          className={`${
            errors.unitCost !== '' ? 'border-red-700 ' : 'border-stone-300'
          } px-3 py-2.5 bg-transparent rounded-[12px] border justify-between items-center inline-flex text-neutral-500 text-base font-semibold focus:outline-primary`}
        />

        {errors.unitCost && (
          <span className="text-xs text-red-700 mt-1 ml-4">
            {errors.unitCost}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <select
          name="priority"
          id="priority"
          onChange={handleChange}
          value={submitData.priority}
          className={`${
            errors.priority !== '' ? 'border-red-700 ' : 'border-stone-300'
          } px-3 py-2.5 bg-transparent rounded-[12px] border justify-between items-center inline-flex text-neutral-500 text-base font-semibold hover:text-white hover:bg-primary focus:outline-primary`}
        >
          <option value="">Select a priority</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>
        {errors.priority && (
          <span className="text-xs text-red-700 mt-1 ml-4">
            {errors.priority}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <textarea
          name="comment"
          id="comment"
          rows="3"
          value={submitData.comment}
          placeholder="Comment"
          onChange={handleChange}
          className={`resize-none  ${
            errors.comment !== '' ? 'border-red-700 ' : 'border-stone-300'
          } px-3 py-2.5 bg-transparent rounded-[12px] border justify-between items-center inline-flex text-neutral-500 text-base font-semibold focus:outline-primary`}
        ></textarea>
        {errors.comment && (
          <span className="text-xs text-red-700 mt-1 ml-4">
            {errors.comment}
          </span>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
