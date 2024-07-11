

import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import './EateryCard.css';

export default function EateryCard(props) {
    const dispatch = useDispatchCart();
    const cartItems = useCart();
    const { id, item, options, ImgSrc } = props;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(Object.keys(options[0])[0]);

    const handleAddToCart = async () => {
        let food = cartItems.find(cartItem => cartItem.id === id);
        let finalPrice = options[0][size] * qty;

        if (food) {
            await dispatch({
                type: "UPDATE",
                id,
                price: finalPrice,
                qty: food.qty + qty
            });
        } else {
            await dispatch({
                type: "ADD",
                id,
                name: item.name,
                price: finalPrice,
                qty,
                size
            });
        }
    };

    return (
        <div className="eatery-card">
            <img src={ImgSrc} className="card-img-top" alt={item.name} />
            <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text">{item.description}</p>
                <div className="selectors">
                    <div>
                        <label htmlFor={`qty-${id}`}>Quantity</label>
                        <select id={`qty-${id}`} value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor={`size-${id}`}>Size</label>
                        <select id={`size-${id}`} value={size} onChange={(e) => setSize(e.target.value)}>
                            {Object.keys(options[0]).map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="total-price">
                    ₹{options[0][size] * qty}/-
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
