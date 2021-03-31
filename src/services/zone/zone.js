import axios from 'axios';
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class ZoneService {

    getZones() {
        return axios.get(`${API_URL}/zones`, { headers: authHeader() });
    }

    getCurrentFestivalZones() {
        return axios.get(`${API_URL}/zones/custom/courant`, { headers: authHeader() });
    }

    create(nomZone, festivalFK) {
        return axios.post(`${API_URL}/zones`, { nomZone, festivalFK }, { headers: authHeader() })
    }

}

export default new ZoneService();