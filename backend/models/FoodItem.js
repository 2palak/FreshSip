const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    name: String,
    category: String,
    img: String,
    options: [{
        size: String,
        price: Number
    }],
    description: String
}, { collection: 'food_items' }); 

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
module.exports = FoodItem;
