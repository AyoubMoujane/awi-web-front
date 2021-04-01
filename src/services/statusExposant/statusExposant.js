import axios from 'axios';
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class StatusExposantService {

    getStatusExposant() {
        return axios.get(`${API_URL}/festival/statusExposant/`, { headers: authHeader() });
    }

}

export default new StatusExposantService();