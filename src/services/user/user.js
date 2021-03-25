import axios from 'axios';
import authHeader from '../authentification/auth-header';
const config = require('../../config')

const API_URL = config.API_URL

class UserService {
    getPublicContent() {
        return axios.get(`${API_URL}/landing`);
    }

    getOrganisatorHome() {
        return axios.get(`${API_URL}/organisator/home`, { headers: authHeader() });
    }

    getAdminHome() {
        return axios.get(`${API_URL}/admin/home`, { headers: authHeader() });
    }

    getAllOrganisators() {
        return axios.get(`${API_URL}/admin/organisators`, { headers: authHeader() })
    }

    deleteOrganisator(data) {
        return axios.delete(`${API_URL}/admin/organisator/${data._id}`, { headers: authHeader() })
    }
}

export default new UserService();