import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import './Home.css';

const Home = () => {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/foodData", {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received from backend:", data); // Add this line

        setFoodItem(data[0] || []);
        setFoodCat(data[1] || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (foodCat.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % foodCat.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [foodCat.length]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? foodCat.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % foodCat.length);
  };

  console.log("Food Categories:", foodCat); // Add this line
  console.log("Food Items:", foodItem); // Add this line

  return (
    <div className="home-container">
      <NavBar />
      <div className="container mt-3">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-inner">
            {foodCat.length > 0 ? (
              foodCat.map((category, index) => (
                <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
                  <img
                    src={
                      index === 0 ? "https://i.pinimg.com/564x/c6/79/8a/c6798afd9b5693d32d22924a3ccceb80.jpg" :
                      index === 1 ? "https://i.pinimg.com/564x/f0/80/8b/f0808b3d8118257c865e1c57b8216cc6.jpg" :
                      "https://i.pinimg.com/564x/d1/12/1f/d1121f93929a36ce31a4ef41c69aca63.jpg"
                    }
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Find your perfect sip... 🥤😋"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <div className="d-block w-100" style={{ maxHeight: "400px", objectFit: "cover" }} />
                <div className="carousel-caption d-none d-md-block">
                  <div className="d-flex justify-content-center align-items-center">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Find your perfect sip... 🥤😋"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={goToPrevSlide}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={goToNextSlide}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container mt-3">
        {foodCat.length > 0 ? (
          foodCat.map((category, catIndex) => (
            <div key={catIndex}>
              <h2>{category.CategoryName}</h2>
              <hr />
              <div className="row">
                {foodItem
                  .filter(item => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                  .map(filteredItem => (
                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 card-container">
                      <Card 
                        foodName={filteredItem.name} 
                        options={filteredItem.options} 
                        imgSrc={filteredItem.img} 
                        item={filteredItem}  
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
