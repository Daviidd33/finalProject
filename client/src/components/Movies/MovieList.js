import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row } from 'react-bootstrap';
import defmovie from '../../assets/defmovie.png'
import { getMovies } from '../../api';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMovies();
            setMovies(movies);
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <Row xs={1} sm={2} md={3} lg={3} xl={3} className="g-4">
                {movies.map((movie) => (
                    <Col>
                        <Card key={movie._id} className="mb-3" style={{ margin: "1rem" }}>
                            <Card.Body>
                                <Card.Img variant="top" style={{ width: "70%" }} src={movie.image.replace(/\s/g, "") ? movie.image : defmovie} alt={movie.title} />
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.description}</Card.Text>
                                <Link to={`/movies/${movie._id}`}>
                                    <Button variant="primary">Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MovieList;