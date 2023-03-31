import axios from 'axios';

const API_URL = 'http://localhost:3001/api';
// 
const MOVIE_ROUTE = "/movies"

export const getMovies = async () => {
    const response = await axios.get(`${API_URL}${MOVIE_ROUTE}/`);
    return response.data;
};

export const getMovie = async (id) => {
    const response = await axios.get(`${API_URL}${MOVIE_ROUTE}/${id}`);
    return response.data;
};

export const addMovie = async (movie) => {
    const response = await axios.post(`${API_URL}${MOVIE_ROUTE}`, movie);
    return response.data;
};

export const updateMovie = async (id, movie) => {
    const response = await axios.put(`${API_URL}${MOVIE_ROUTE}/${id}`, movie);
    return response.data;
};

export const deleteMovie = async (id) => {
    const response = await axios.delete(`${API_URL}${MOVIE_ROUTE}/${id}`);
    return response.data;
};

export const searchMovies = async (query) => {
    const response = await axios.get(`${API_URL}${MOVIE_ROUTE}/search?query=${query}`);
    return response.data;
};

export const rateMovie = async (id, rating) => {
    const response = await axios.post(`${API_URL}${MOVIE_ROUTE}/${id}/rate`, {
        rating,
    });
    return response.data;
};