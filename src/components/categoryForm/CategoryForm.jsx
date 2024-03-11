import { API_BASE_URL } from '@/constants/constants';
import React, { useEffect, useState } from 'react';

const CategoryForm = ({ imageObject, submitData, setSubmitData, errors }) => {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedSubelement, setSelectedSubelement] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [descriptions, setDescriptions] = useState([]);
  const [isLoadingDescriptions, setIsLoadingDescriptions] = useState(false);

  useEffect(() => {
    fetch(API_BASE_URL + '?type=getAllCategories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((e) => console.error('Error: ', e));
  }, []);

  useEffect(() => {
    if (imageObject) {
      setSelectedCategory(imageObject.category || '');
      setSelectedElement(imageObject.element || '');
      setSelectedSubelement(imageObject.subelement || '');
      setSelectedDescription(imageObject.description || '');
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
    setSelectedCategory(e.target.value);
    setSubmitData({
      ...submitData,
      category: e.target.value,
      element: '',
      subelement: '',
      description: '',
    });
    setSelectedElement('');
    setSelectedSubelement('');
    setSelectedDescription('');
  };

  const handleElementChange = (e) => {
    setSelectedElement(e.target.value);
    setSubmitData({
      ...submitData,
      element: e.target.value,
      subelement: '',
      description: '',
    });
    setSelectedSubelement('');
    setSelectedDescription('');
  };

  const handleSubelementChange = (e) => {
    setSelectedSubelement(e.target.value);
    setSubmitData({
      ...submitData,
      subelement: e.target.value,
      description: '',
    });
    setSelectedDescription('');
  };

  const handleDescriptionChange = (e) => {
    setSelectedDescription(e.target.value);
    setSubmitData({
      ...submitData,
      description: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <select
          name="category"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className={`${errors.category == '' ? 'border-red-700' : ''}`}
        >
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
          <span className="text-xs text-red-700">errors.category</span>
        )}
      </div>

      <div className="flex flex-col">
        <select
          name="element"
          onChange={handleElementChange}
          value={selectedElement}
          disabled={!selectedCategory}
          className={`${errors.element !== '' ? 'border border-red-700 ' : ''}`}
        >
          {selectedElement == '' && <option value="">Select an element</option>}
          {selectedCategory &&
            Object.keys(categories[selectedCategory] || {}).map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
        </select>
        {errors.element && (
          <span className="text-xs text-red-700">{errors.element}</span>
        )}
      </div>

      <div className="flex flex-col">
        <select
          name="subelement"
          onChange={handleSubelementChange}
          value={selectedSubelement}
          disabled={!selectedElement}
          className={`${
            errors.subelement !== '' ? 'border border-red-700 ' : ''
          }`}
        >
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
          <span className="text-xs text-red-700">{errors.subelement}</span>
        )}
      </div>

      <select
        name="description"
        onChange={handleDescriptionChange}
        value={selectedDescription}
        disabled={!selectedSubelement}
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
          name="priority"
          id="priority"
          onChange={handleChange}
          value={submitData.priority}
          className={`${
            errors.priority !== '' ? 'border border-red-700 ' : ''
          }`}
        >
          <option value="">Select a priority</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>
        {errors.priority && (
          <span className="text-xs text-red-700">{errors.priority}</span>
        )}
      </div>

      <div className="flex flex-col">
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="10"
          value={submitData.comment}
          placeholder="Comment"
          onChange={handleChange}
          className={`${errors.comment !== '' ? 'border border-red-700 ' : ''}`}
        ></textarea>
        {errors.comment && (
          <span className="text-xs text-red-700">{errors.comment}</span>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
