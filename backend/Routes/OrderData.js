const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Route for adding/updating order data
router.post('/addOrder', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date });

        // Ensure email is correctly retrieved from req.body
        let userEmail = req.body.email;

        let eId = await Order.findOne({ email: userEmail });

        if (eId === null) {
            try {
                await Order.create({
                    email: userEmail,
                    order_data: [data]
                });
                res.json({ success: true });
            } catch (error) {
                console.error("Error creating order: ", error.message);
                res.status(500).send("Server Error: " + error.message);
            }
        } else {
            try {
                await Order.findOneAndUpdate(
                    { email: userEmail },
                    { $push: { order_data: [data] } } // Ensure each order is added as a nested array
                );
                res.json({ success: true });
            } catch (error) {
                console.error("Error updating order: ", error.message);
                res.status(500).send("Server Error: " + error.message);
            }
        }
    } catch (error) {
        console.error("Error in processing order data: ", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

// Route for retrieving order data
router.post('/orderData', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const orderData = await Order.findOne({ email });
        if (!orderData) {
            return res.status(404).json({ error: 'No orders found for this email' });
        }

        res.json({ orderData });
    } catch (error) {
        console.error('Error in processing order data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route for retrieving eatery data from JSON file
router.get('/eateryData', (req, res) => {
    const filePath = path.join(__dirname, '..', 'data', 'eatery.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading eatery.json:', err);
            res.status(500).json({ error: 'Failed to fetch eatery data' });
            return;
        }
        try {
            const eateryData = JSON.parse(data);
            res.json({ eateryData });
        } catch (error) {
            console.error('Error parsing eatery.json:', error);
            res.status(500).json({ error: 'Failed to parse eatery data' });
        }
    });
});


module.exports = router;
