const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const FoodCategory = require('../models/FoodCategory');


router.post('/foodData', async (req, res) => {
    try {
        console.log("Fetching food data...");

        // Query MongoDB for food items and categories using Mongoose models
        const foodItems = await FoodItem.find();
        const foodCategories = await FoodCategory.find();

        console.log("Food Items:", foodItems);
        console.log("Food Categories:", foodCategories);

        res.json([foodItems, foodCategories]);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Server Error!");
    }
});


module.exports = router;
