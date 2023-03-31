import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { getMovie, rateMovie } from '../../api';
import defmovie from '../../assets/defmovie.png'

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(0);
    const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);
    const { id } = useParams();

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleRatingSubmit = async () => {
        setIsRatingSubmitting(true);

        try {
            await rateMovie(id, rating);
            const updatedMovie = await getMovie(id);
            setMovie(updatedMovie);
        } catch (err) {
            console.error(err);
        } finally {
            setIsRatingSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            const movie = await getMovie(id);
            setMovie(movie);
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card className="mb-3" style={{ alignItems: "center" }}>
                <Card.Img style={{ width: "30%" }} variant="top" src={movie.image.replace(/\s/g, "") ? movie.image : defmovie} alt={movie.title} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Release Date: {movie.releaseDate}</ListGroupItem>
                    <ListGroupItem>Runtime: {movie.runtime} minutes</ListGroupItem>
                    <ListGroupItem>
                        Cast: {movie.cast.join(', ')}
                    </ListGroupItem>
                    <ListGroupItem>
                        Rating: {movie.ratings.reduce((total, rating) => total + rating.rating, 0) / movie.ratings.length} ({movie.ratings.length} ratings)
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <select value={rating} onChange={handleRatingChange}>
                        <option value="0">Rate this movie</option>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
                    <Button
                        variant="primary"
                        disabled={!rating || isRatingSubmitting}
                        onClick={handleRatingSubmit}
                    >
                        {isRatingSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Card.Body>
            </Card>
        </div >
    );
};

export default MovieDetails;