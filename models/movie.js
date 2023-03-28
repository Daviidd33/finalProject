const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    releaseDate: Date,
    runtime: Number,
    cast: [String],
    image: String,
    ratings: [Number], //rating 1-5
    trailer: String
});

module.exports = mongoose.model('Movie', movieSchema);