const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    amounts: [Number],
    ingredients: [String],
});

module.exports = mongoose.model('Recipe', recipeSchema);