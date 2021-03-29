import axios from 'axios';
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class SuiviExposantService {


    getAllSuivisExposants(data) {
        return axios.get(`${API_URL}/festival/suiviExposant/${data.idFestival}`, { headers: authHeader() });
    }

    getReservation(data) {
        return axios.get(`${API_URL}/festival/suiviExposant/reservation/${data.idReservation}`, { headers: authHeader() });
    }

    getEspacesReserves(data) {
        return axios.get(`${API_URL}/festival/suiviExposant/espacesReserves/`,
            { params: { idFestival : data.idFestival, idReservation : data.idReservation} }, 
            { headers: authHeader() });
    }

}

export default new SuiviExposantService();