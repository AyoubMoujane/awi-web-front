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

    updateSecondContact(data) {
        console.log(data)
        return axios.put(`${API_URL}/suiviExposant/secondContact/${data.idFestival}&${data.idParticipant}`, 
        data,
        { headers: authHeader() })
    }

    updateTroisiemeContact(data) {
        return axios.put(`${API_URL}/suiviExposant/troisiemeContact/${data.idFestival}&${data.idParticipant}`, 
        data,
        { headers: authHeader() })
    }

    updateStatus(data) {
        return axios.put(`${API_URL}/suiviExposant/status/${data.idFestival}&${data.idParticipant}`, 
        data,
        { headers: authHeader() })
    }

    updatePlace(data) {
        return axios.put(`${API_URL}/suiviExposant/place/${data.idFestival}&${data.idParticipant}`, 
        data,
        { headers: authHeader() })
    }

    updateBesoinBenevol(data) {
        return axios.put(`${API_URL}/suiviExposant/besoinBenevol/${data.idFestival}&${data.idParticipant}`, 
        data,
        { headers: authHeader() })
    }

}

export default new SuiviExposantService();