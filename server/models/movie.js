const mongoose = require("mongoose");

// here is collection of the database 

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    releaseDate: Date,
    runtime: Number,
    cast: [String],
    image: String,
    trailer: String
});

module.exports = mongoose.model('Movie', movieSchema);