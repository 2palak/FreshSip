const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodCategorySchema = new Schema({
    CategoryName: String, // Adjust field names to match your database
    // Add more fields as per your schema
});

const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema, 'food_category'); // 'food_category' is the existing collection name
module.exports = FoodCategory;
