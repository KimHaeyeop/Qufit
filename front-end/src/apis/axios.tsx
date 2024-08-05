import axios from 'axios';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
<<<<<<< HEAD
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
    },
=======
>>>>>>> 16750b6d79780c204661ccefb43be5cae9db438f
});
