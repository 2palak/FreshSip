import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import eateryData from '../data/eatery.json'; 
import './Cart.css';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const [showModal, setShowModal] = useState(false);
    const [paymentOption, setPaymentOption] = useState('');

    if (data.length === 0) {
        return (
            <div className='empty-cart'>
                <p>🛒 Your Cart is Empty!</p>
                <p>Start adding some delicious items 😋</p>
            </div>
        );
    }

    const handleCheckOut = () => {
        setShowModal(true);
    };

    const handleProceed = async () => {
        let userEmail = localStorage.getItem("userEmail");
        console.log("User Email:", userEmail);

        try {
            
            let response = await fetch("http://localhost:5000/api/addOrder", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString(),
                    payment_mode: paymentOption
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("JSON RESPONSE:::::", response.status);
            if (response.status === 200) {
                dispatch({ type: "DROP" });
            } else {
                alert('Failed to complete the checkout. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to complete the checkout. Please try again later.');
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const getImageUrl = (itemName) => {
        let imageUrl = 'https://i.pinimg.com/564x/c4/c8/d8/c4c8d86c2e63904390c5797922d8d7d4.jpg'; 
        try {
            eateryData.forEach(category => {
                category.SubCategories.forEach(subCategory => {
                    subCategory.Items.forEach(item => {
                        if (item.name === itemName) {
                            imageUrl = item.img;
                            throw new Error('Item found'); 
                        }
                    });
                });
            });
        } catch (error) {
            console.log(error.message);
        }
        return imageUrl;
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div className='portal'>
            <div className='cart-container'>
                <div className='cart-items'>
                    {data.map((food, index) => {
                        const imageUrl = food.img || getImageUrl(food.name); 
                        return (
                            <div key={index} className='cart-item'>
                                <img 
                                    src={imageUrl} 
                                    alt={food.name} 
                                    className='cart-item-img' 
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719446400&semt=sph'; 
                                        console.error(`Failed to load image for ${food.name}`);
                                    }} 
                                />
                                <div className='cart-item-details'>
                                    <h3>{food.name}</h3>
                                    <p>Quantity: {food.qty}</p>
                                    <p>Option: {food.size}</p>
                                </div>
                                <div className='cart-item-price'>
                                    <p>{food.price}</p>
                                    <button className='delete-btn' onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                                        <Delete />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='cart-summary'>
                    <h1>Total Price: {totalPrice}/-</h1>
                    <button className='checkout-btn' onClick={handleCheckOut}>Checkout 💳</button>
                </div>
            </div>
            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h2>Select Payment Method </h2>
                        <div className='payment-options'>
                            <label>
                                <input 
                                    type='radio' 
                                    value='UPI' 
                                    checked={paymentOption === 'UPI'} 
                                    onChange={(e) => setPaymentOption(e.target.value)} 
                                />
                                UPI 📲
                            </label>
                            <label>
                                <input 
                                    type='radio' 
                                    value='Credit/Debit Card' 
                                    checked={paymentOption === 'Credit/Debit Card'} 
                                    onChange={(e) => setPaymentOption(e.target.value)} 
                                />
                                Credit/Debit Card 💳
                            </label>
                            <label>
                                <input 
                                    type='radio' 
                                    value='Net Banking' 
                                    checked={paymentOption === 'Net Banking'} 
                                    onChange={(e) => setPaymentOption(e.target.value)} 
                                />
                                Net Banking 🏦
                            </label>
                        </div>
                        <div className='modal-actions'>
                            <button className='proceed-btn' onClick={handleProceed}>Proceed</button>
                            <button className='cancel-btn' onClick={handleCancel}>Cancel Payment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
