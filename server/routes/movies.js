const express = require("express");
const Movie = require("../models/movie");
const router = express.Router();


// http://localhost:3001/api/movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        console.log(`Error getting movies: ${err}`);
        res.status(500).send('Server error');
    }
});

// http://localhost:3001/api/movies/:id
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie)
            return res.status(500).send(`Movie ${req.params.id} not found`);
        res.json(movie);
    } catch (err) {
        console.log(`Error getting movie: ${err}`);
        res.status(500).send('Server error');
    }
});


// http://localhost:3001/api/movies
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

// Update
// http://localhost:3001/api/movies/:id
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!movie)
            return res.status(500).send('Update error - Movie not found');
        res.json(movie);
    } catch (err) {
        console.log(`Error updating movie: ${err}`);
        res.status(500).send('Server error');
    }
});


// http://localhost:3001/api/movies/:id
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.send('Movie deleted successfully');
    } catch (err) {
        console.log(`Error deleting movie: ${err}`);
        res.status(500).send('Server error');
    }
});

// http://localhost:3001/api/movies/search/:query
router.get('/search/:query', async (req, res) => {
    try {
        const query = req.params.query.toLowerCase();
        let movies = await Movie.find();

        movies = movies.filter(movie => {
            // X-MEN -> x
            const title = movie.title.toLowerCase();
            if (title.includes(query)) {
                return movie;
            }

            const description = movie.description.toLowerCase();
            if (description.includes(query)) {
                return movie;
            }

            // const rating = movie.ratings => movie.ratings.reduce((a, b) => a + b) / movie.ratings.length;
            // if (ratings.sum(query)) {
            //     return movie;
            // }
        })

        res.json(movies);
    } catch (err) {
        console.log(`Error searching movies: ${err}`);
        res.status(500).send('Server error');
    }
});

module.exports = router;