import { API_BASE_URL } from '@/constants/constants';
import React, { useEffect, useState } from 'react';

const CategoryForm = ({ imageObject, setSubmitData }) => {
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
    setSubmitData((prevData) => ({
      ...prevData,
      category: e.target.value,
      element: '',
      subelement: '',
      description: '',
    }));
    setSelectedElement('');
    setSelectedSubelement('');
    setSelectedDescription('');
  };

  const handleElementChange = (e) => {
    setSelectedElement(e.target.value);
    setSubmitData((prevData) => ({
      ...prevData,
      element: e.target.value,
      subelement: '',
      description: '',
    }));
    setSelectedSubelement('');
    setSelectedDescription('');
  };

  const handleSubelementChange = (e) => {
    setSelectedSubelement(e.target.value);
    setSubmitData((prevData) => ({
      ...prevData,
      subelement: e.target.value,
      description: '',
    }));
    setSelectedDescription('');
  };

  const handleDescriptionChange = (e) => {
    setSelectedDescription(e.target.value);
    setSubmitData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col">
      <select
        name="category"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        {selectedCategory == '' && <option value="">Select a category</option>}
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        name="element"
        onChange={handleElementChange}
        value={selectedElement}
        disabled={!selectedCategory}
      >
        {selectedElement == '' && <option value="">Select an element</option>}
        {selectedCategory &&
          Object.keys(categories[selectedCategory] || {}).map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
      </select>

      <select
        name="subelement"
        onChange={handleSubelementChange}
        value={selectedSubelement}
        disabled={!selectedElement}
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
      <select name="priority" id="">
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        <option value="P3">P3</option>
        <option value="P4">P4</option>
      </select>
      <textarea
        name="comment"
        id=""
        cols="30"
        rows="10"
        placeholder="Comment"
      ></textarea>
    </div>
  );
};

export default CategoryForm;
