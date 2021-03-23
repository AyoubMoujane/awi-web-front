import axios from 'axios';
import authHeader from '../authentification/auth-header';

//const config = require('../../config')
//const API_URL = config.API_URL

class FestivalService {

    getFestivals() {
        return axios.get('http://localhost:8080/api/festivals', { headers: authHeader() });
    }

    setFestival(data) {

        return axios
            .post('http://localhost:8080/api/festivals',
                data,
                { headers: authHeader() }
            )
    }
}

export default new FestivalService();