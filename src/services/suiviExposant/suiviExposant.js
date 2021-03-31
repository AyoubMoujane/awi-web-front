import axios from 'axios';
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class SuiviExposantService {

    getAllSuivisExposants(data) {
        return axios.get(`${API_URL}/suiviExposant/festival/${data.idFestival}`, { headers: authHeader() });
    }

    updatePremierContact(data) {
        return axios.put(`${API_URL}/suiviExposant/premierContact/${data.idFestival}&${data.idParticipant}`, 
        data,
        { headers: authHeader() })
    }

}

export default new SuiviExposantService();