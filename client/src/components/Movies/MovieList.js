import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row, Form } from 'react-bootstrap';
import defmovie from '../../assets/defmovie.png'
import { getMovies } from '../../api';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [field, setField] = useState('title');
    const [asc, setAsc] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMovies();
            setMovies(movies);
        };

        fetchMovies();
    }, []);

    const handleSearch = (event) => {
        setSearchValue(event.target.value)
    }

    const handleSort = (e) => {
        const newField = e.target.value;
        setAsc(newField === field ? !asc : true);
        setField(newField);
    };

    const sortedMovies = [...movies].sort((a, b) => {
        if (a[field] < b[field]) {
            return asc ? -1 : 1;
        }
        if (a[field] > b[field]) {
            return asc ? 1 : -1;
        }
        return 0;
    });

    return (
        <div>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formImage">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                value={searchValue}
                                onChange={handleSearch}
                                placeholder='Title'
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleSort} value={field}>
                        Title {field === 'title' ? (asc ? '▲' : '▼') : ''}
                    </Button>
                </Col>
            </Row>
            <Row xs={1} sm={2} md={3} lg={3} xl={3} className="g-4">
                {sortedMovies.filter((movie) =>
                    movie.title.toLowerCase().includes(searchValue.toLowerCase())
                ).map((movie) => (
                    <Col>
                        <Card key={movie._id} className="mb-3" style={{ margin: "1rem", height: '100%' }}>
                            <Card.Header>
                                <Card.Title>{movie.title}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" style={{ width: "70%" }} src={movie.image.replace(/\s/g, "") ? movie.image : defmovie} alt={movie.title} />
                                <Card.Text>{movie.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to={`/movies/${movie._id}`}>
                                    <Button variant="primary">Details</Button>
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MovieList;