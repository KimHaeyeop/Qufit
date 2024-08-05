import axios from 'axios';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
    },
});
