import axios from 'axios';

const instance = axios.create({
    baseURL: 
    'https://myburgerapp-9b592.firebaseio.com'
});

export default instance;