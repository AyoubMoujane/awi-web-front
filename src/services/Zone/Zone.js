import axios from "axios";
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class ZoneService {
    findAll() {
        return axios
            .get(`${API_URL}/zones`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

    delete(id) {
        return axios
            .post(`${API_URL}/zones/${id}`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

    create(nomZone) {
        return axios
            .post(`${API_URL}/zones`, { headers: authHeader(), nomZone })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

}

export default new ZoneService();