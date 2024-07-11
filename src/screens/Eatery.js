

import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import EateryCard from '../components/EateryCard';
import './Eatery.css';

const eatery = require('../data/eatery.json');

export default function Eatery() {
    const [selectedCategory, setSelectedCategory] = useState('Sweet');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    useEffect(() => {
        if (selectedCategory) {
            setSelectedSubCategory('');
        }
    }, [selectedCategory]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };

    return (
        <>
            <NavBar />
            <div className="myorder-container">
            <Container className="eatery-container eatery-background">
                <div className={`centered-content ${selectedCategory ? 'top-content' : ''}`}>
                    <div className="intro-text">
                        <h2>Your drink's got the groove 🍹 - now it's snack time to keep the vibe going! 😋</h2>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={selectedCategory || "Choose your goto snack"}
                            className="category-dropdown"
                        >
                            {eatery.map((category) => (
                                <Dropdown.Item 
                                    key={category.CategoryName} 
                                    onClick={() => handleCategorySelect(category.CategoryName)}
                                >
                                    {category.CategoryName}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                </div>

                {selectedCategory && (
                    <div className="non-centered-content">
                        <div className="category-header">
                            <h1>{selectedCategory}</h1>
                        </div>
                        {eatery
                            .filter(cat => cat.CategoryName === selectedCategory)
                            .map((eateryCategory) => (
                                <div key={eateryCategory.CategoryName} className="category-section">
                                    {eateryCategory.SubCategories.map((subCategory) => (
                                        <div key={subCategory.SubCategoryName} className="subcategory-section">
                                            <h2>{subCategory.SubCategoryName}</h2>
                                            <div className="card-grid">
                                                {subCategory.Items.map((item) => (
                                                    <EateryCard
                                                        key={item._id}
                                                        id={item._id}
                                                        item={item}
                                                        options={item.options}
                                                        ImgSrc={item.img}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                )}
            </Container>
            <Footer />
            </div>
        </>
    );
}
