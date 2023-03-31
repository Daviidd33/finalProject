import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addMovie } from '../../api';

const AddMovie = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [runtime, setRuntime] = useState('');
    const [cast, setCast] = useState('');
    const [image, setImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleReleaseDateChange = (event) => {
        setReleaseDate(event.target.value);
    };

    const handleRuntimeChange = (event) => {
        setRuntime(event.target.value);
    };

    const handleCastChange = (event) => {
        setCast(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await addMovie({
                title,
                description,
                releaseDate,
                runtime,
                cast: cast.split(',').map((c) => c.trim()),
                image,
            });

        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Add Movie</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Form.Group>
                <Form.Group controlId="formReleaseDate">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={releaseDate}
                        onChange={handleReleaseDateChange}
                    />
                </Form.Group>
                <Form.Group controlId="formRuntime">
                    <Form.Label>Runtime (minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        value={runtime}
                        onChange={handleRuntimeChange}
                    />
                </Form.Group>
                <Form.Group controlId="formCast">
                    <Form.Label>Cast</Form.Label>
                    <Form.Control
                        type="text"
                        value={cast}
                        onChange={handleCastChange}
                    />
                    <Form.Text className="text-muted">
                        Separate each name with a comma (e.g. John Smith, Jane Doe)
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={image}
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={!title || !description || !releaseDate || !runtime || !cast || !image || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </div>
    );
};

export default AddMovie;