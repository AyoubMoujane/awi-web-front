import axios from "axios";
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class ParticipantService {
    findAll() {
        return axios
            .get(`http://localhost:8080/api/participants`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

    delete(id) {
        return axios
            .post(`http://localhost:8080/api/participants/${id}`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

    create(nomParticipant, editeurSeulement) {
        return axios
            .post(`http://localhost:8080/api/participants`, { headers: authHeader(), nomParticipant, editeurSeulement })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

}

export default new ParticipantService();