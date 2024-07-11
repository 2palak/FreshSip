import React, { useState, useEffect } from 'react';
import EateryCard from './EateryCard';
import axios from 'axios';

const ParentComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data); // Update the categories state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (!categories || categories.length === 0) {
    return <p>No categories to display</p>;
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const categoryOptions = categories.map(category => (
    <option key={category.CategoryName} value={category.CategoryName}>
      {category.CategoryName}
    </option>
  ));

  const subcategoryOptions = selectedCategory ? (
    categories.find(category => category.CategoryName === selectedCategory)
      .SubCategories.map(subcategory => (
        <option key={subcategory.SubCategoryName} value={subcategory.SubCategoryName}>
          {subcategory.SubCategoryName}
        </option>
      ))
  ) : [];

  return (
    <div>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categoryOptions}
        </select>
      </div>
      <div>
        <label htmlFor="subcategory">Subcategory:</label>
        <select id="subcategory" value={selectedSubcategory} onChange={handleSubcategoryChange} disabled={!selectedCategory}>
          <option value="">Select Subcategory</option>
          {subcategoryOptions}
        </select>
      </div>
      {selectedCategory && selectedSubcategory ? (
        <EateryCard categories={categories} selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} />
      ) : (
        <p>Please select a category and subcategory</p>
      )}
    </div>
  );
};

export default ParentComponent;
