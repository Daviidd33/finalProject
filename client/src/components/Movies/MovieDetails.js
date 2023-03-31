import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';
import { deleteMovie, getMovie } from '../../api';
import defmovie from '../../assets/defmovie.png'
import YouTube from 'react-youtube';

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => setShowModal(false);
    const handleConfirm = () => {
        deleteMovie(id)
        handleClose();
        navigate("/")
    };

    const getYoutubeIdFromUrl = (url) => {
        const index = url.indexOf('v=');

        if (index !== -1) {
            const videoId = url.slice(index + 2);
            return videoId;
        }

        return null;
    }

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

                    <Link to={`/edit/${movie._id}`}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                    <Button style={{ marginLeft: "10px" }} variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Release Date: {movie.releaseDate.split("T")[0]}</ListGroupItem>
                    <ListGroupItem>Runtime: {movie.runtime} minutes</ListGroupItem>
                    <ListGroupItem>
                        Cast: {movie.cast.join(', ')}
                    </ListGroupItem>
                </ListGroup>
                {movie.trailer && getYoutubeIdFromUrl(movie.trailer) && <Card.Footer>
                    Trailer:
                    <YouTube videoId={getYoutubeIdFromUrl(movie.trailer)} />
                </Card.Footer>}
            </Card>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this movie?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default MovieDetails;