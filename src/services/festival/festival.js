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

    updateFestival(data) {

        return axios
            .put(`${API_URL}/festivals/${data.idFestival}`,
                data,
                { headers: authHeader() }
            )
    }

    switchCurrentFestival(previousCurrentFestival, newCurrentFestival) {

        return axios
            .put(`${API_URL}/festivals/custom/switchCurrent`,
                { previousCurrentFestival, newCurrentFestival },
                { headers: authHeader() }
            )
    }
}

export default new FestivalService();