import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatchCart, useCart } from './ContextReducer';
import './Card.css'; 

const Card = ({ foodName, options: propOptions, imgSrc, item }) => {
  const dispatch = useDispatchCart();
  const data = useCart();

  const options = propOptions[0] || {}; // Default to empty object if propOptions is undefined
  const priceOptions = Object.keys(options);

  const initialSize = priceOptions.length > 0 ? priceOptions[0] : '';
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    console.log("Selected size (handleSizeChange):", size);
    console.log("Size state updated:", size);
  }, [size]);

  const handleAddToCart = async () => {
    if (item && item._id) {
      const itemPrice = parseFloat(options[size] || 0);
      const totalItemPrice = itemPrice * qty;
  
      const existingItem = data.find(food => food.id === item._id && food.size === size);
  
      if (existingItem) {
        await dispatch({
          type: "UPDATE",
          id: item._id,
          qty: qty,
          price: totalItemPrice,
          size: size
        });
      } else {
        await dispatch({
          type: "ADD",
          id: item._id,
          name: item.name,
          price: totalItemPrice,
          qty: qty,
          size: size,
          img: imgSrc
        });
      }
      console.log(data);
    } else {
      console.error("Error: item or item._id is undefined", item);
    }
  };
  

  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    setQty(newQty);
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
  };

  let finalPrice = qty * parseFloat(options[size] || 0);

  return (
    <div className="card h-100">
      <img src={imgSrc} className="card-img-top" alt={foodName} style={{ height: "180px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{foodName}</h5>
          <p className="card-text">{item.name && item.description}</p>
        </div>
        <div>
          <div key={Math.random()} className="d-flex justify-content-between">
            <select className="dropdown-custom rounded" value={qty} onChange={handleQtyChange}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="dropdown-custom rounded" value={size} onChange={handleSizeChange}>
              {priceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <span className="total-price">₹{finalPrice.toFixed(2)} /-</span>
          </div>
          <button className="btn btn-primary mt-2 w-100" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  foodName: PropTypes.string.isRequired,
  options: PropTypes.array,
  imgSrc: PropTypes.string.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string
  })
};

Card.defaultProps = {
  options: [],
  item: null
};

export default Card;
