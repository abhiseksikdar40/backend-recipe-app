// 2. Create your db connection.

const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGODB

const initializeRecipeData = async () => {
    await mongoose
    .connect(mongoUrl)
    .then (() => {
        console.log("Database Connected.");
    })
    .catch ((error) => {
        console.log("Failed To Connect Database!", error);
    })
}

module.exports = { initializeRecipeData }