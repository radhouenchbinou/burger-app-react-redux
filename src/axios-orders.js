import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-a783c-default-rtdb.firebaseio.com/'
});

export default instance;
