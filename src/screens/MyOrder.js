import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import NavBar from '../components/NavBar';
import './MyOrder.css';
import eateryData from '../data/eatery.json'; // Import eatery.json

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    // Fetch order data from API
    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        console.log('User Email:', userEmail);

        try {
            const response = await fetch(`${window.location.origin}/api/orderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Order Data:', data);
                setOrderData(data.orderData?.order_data || []);
            } else {
                console.error('Failed to fetch order data');
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    // Call fetchMyOrder on component mount
    useEffect(() => {
        fetchMyOrder();
    }, []);

    // Function to get image URL from eatery.json based on item name
    const getImageUrl = (itemName) => {
        let imageUrl = 'default-image-url.jpg'; 
        try {
            eateryData.forEach(category => {
                category.SubCategories.forEach(subCategory => {
                    subCategory.Items.forEach(item => {
                        if (item.name === itemName) {
                            imageUrl = item.img;
                            throw new Error('Item found'); // Break forEach loop when item is found
                        }
                    });
                });
            });
        } catch (error) {
            console.log(error.message);
        }
        return imageUrl;
    };

    return (
        <div className="myorder-container">
            <NavBar />
            <Container className="myorder-background">
                <div className='container'>
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((order, index) => {
                            console.log('Order:', order);
                            // Check if order is an array before slicing
                            if (!Array.isArray(order)) {
                                console.error('Expected order to be an array but got:', order);
                                return null;
                            }

                            return (
                                <div key={index} className='order-group'>
                                    {order[0]?.Order_date && (
                                        <div className='order-date'>
                                            <h5>Order Date: {order[0].Order_date}</h5>
                                            <hr />
                                        </div>
                                    )}
                                    <div className='row'>
                                        {order.slice(1).map((arrayData, idx) => {
                                            console.log('Array Data:', arrayData);
                                            const imageUrl = arrayData.img || getImageUrl(arrayData.name); // Use image URL from API or eatery.json
                                            return (
                                                <div key={idx} className="col-12 col-md-6 col-lg-3">
                                                    <div className="card mt-3">
                                                        <img 
                                                            src={imageUrl}
                                                            className="card-img-top" 
                                                            alt={arrayData.name} 
                                                            onError={(e) => {
                                                                e.target.onerror = null; 
                                                                e.target.src = 'https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719446400&semt=sph'; // Replace with a default image URL
                                                                console.error(`Failed to load image for ${arrayData.name}`);
                                                            }} 
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div className='container w-100 p-0'>
                                                                <span className='m-1 quantity'>{arrayData.qty}</span> {/* Apply CSS for quantity */}
                                                                <span className='m-1 size'>{arrayData.size}</span> {/* Apply CSS for size */}
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5 price' style={{ color: 'red' }}> {/* Apply CSS for price */}
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h4 className='no-orders'>No orders found 😊</h4>
                    )}
                </div>
            </Container>
            <Footer />
        </div>
    );
}
