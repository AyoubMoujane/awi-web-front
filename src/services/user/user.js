import axios from 'axios';
import authHeader from '../authentification/auth-header';
const config = require('../../config')

const API_URL = config.API_APP_URL

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'landing');
    }

    getAdminHome() {
        return axios.get(API_URL + 'admin/home', { headers: authHeader() });
    }

    getOrganisatorHome() {
        return axios.get(API_URL + 'organisator/home', { headers: authHeader() });
    }
}

export default new UserService();