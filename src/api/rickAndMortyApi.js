import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async ({ page = 1, name = '', status = '', species = '', gender = '' }) => {
    const params = {};

    if (page) params.page = page;
    if (name) params.name = name;
    if (status) params.status = status;
    if (species) params.species = species;
    if (gender) params.gender = gender;

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error?.response?.data?.error);
        return null;
    }
};

export const fetchCharacter = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching character:', error?.response?.data?.error);
        return null;
    }
};

export const fetchCharactersByIds = async (ids) => {
    try {
        const response = await axios.get(`${BASE_URL}/${ids.join(',')}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error?.response?.data?.error);
        return null;
    }
};