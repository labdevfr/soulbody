import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://soulbody-ba299-default-rtdb.europe-west1.firebasedatabase.app',
});
