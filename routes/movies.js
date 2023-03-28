const express = require("express");
const Movie = require("../models/movie");
const router = express.Router();

//api/movies/
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        console.log(`Error getting movies: ${err}`);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        console.log(`Error getting movie: ${err}`);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.json(movie);
    } catch (err) {
        console.log(`Error adding movie: ${err}`);
        res.status(500).send('Server error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(movie);
    } catch (err) {
        console.log(`Error updating movie: ${err}`);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.send('Movie deleted successfully');
    } catch (err) {
        console.log(`Error deleting movie: ${err}`);
        res.status(500).send('Server error');
    }
});

router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { cast: { $regex: query, $options: 'i' } },
            ],
        });
        res.json(movies);
    } catch (err) {
        console.log("Error searching movies: ${err}");
        res.status(500).send('Server error');
    }
});

module.exports = router;