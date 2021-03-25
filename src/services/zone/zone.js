import axios from 'axios';
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class ZoneService {

    getZones() {
        return axios.get(`${API_URL}/zones`, { headers: authHeader() });
    }

}

export default new ZoneService();