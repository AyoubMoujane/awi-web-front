import axios from 'axios';
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class SuiviExposantService {

    getAllSuivisExposants() {
        return axios.get(`${API_URL}/suiviExposant`, { headers: authHeader() });
    }

}

export default new SuiviExposantService();