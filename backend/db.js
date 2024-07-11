
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = "mongodb+srv://palak:palak@cluster0.rw5kkya.mongodb.net/FreshSipDatabase?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const foodCollection = mongoose.connection.db.collection("food_items");
        const categoryCollection = mongoose.connection.db.collection("food_category");
        const eatCollection = mongoose.connection.db.collection("eat_items");

        const foodData = await foodCollection.find({}).toArray();
        console.log("data fetched from food_item");
        const categoryData = await categoryCollection.find({}).toArray();
        console.log("data fetched from food_category");
        const eatData = await eatCollection.find({}).toArray();
        console.log("data fetched from eat_item");

        return { foodData, categoryData, eatData };
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

module.exports = connectToMongoDB;


/*
const mongoose = require('mongoose');

const mongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://palak:palak@cluster0.rw5kkya.mongodb.net/FreshSip?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = mongoDB;
*/