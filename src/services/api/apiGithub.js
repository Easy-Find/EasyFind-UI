import axios from "axios";

const apiGithub = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 5000,
});

export default apiGithub;