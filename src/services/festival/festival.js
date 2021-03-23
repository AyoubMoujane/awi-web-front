import axios from 'axios';
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class FestivalService {

    getFestivals() {
        return axios.get(`${API_URL}/festivals`, { headers: authHeader() });
    }

    setFestival(data) {

        return axios
            .post(`${API_URL}/festivals`,
                data,
                { headers: authHeader() }
            )
    }
}

export default new FestivalService();