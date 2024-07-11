import React from 'react';

const Carousal = () => {
  return (
    <div className="carousal-container position-relative">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://c0.wallpaperflare.com/preview/907/807/666/cheese-food-meal-dinner.jpg"
              className="d-block w-100"
              alt="Slide 1"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <form className="d-flex justify-content-center align-items-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://ii1.pepperfry.com/media/catalog/product/p/i/1100x1210/pink-quotes-printed-300-ml-ceramic--set-of-2--coffee-mug-pink-quotes-printed-300-ml-ceramic--set-of--b8kee7.jpg"
              className="d-block w-100"
              alt="Slide 2"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <form className="d-flex justify-content-center align-items-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          {/* Add more carousel items as needed */}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousal;
