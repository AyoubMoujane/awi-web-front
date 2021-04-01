import axios from "axios";
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class ReservationEspaceService {
    findAll() {
        return axios
            .get(`${API_URL}/reservationsEspaces`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }
   

    delete(idReservation, idEspace) {
        return axios
            .delete(`${API_URL}/reservationsEspaces/${idReservation}&${idEspace}`, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
    }



    get(idReservation, idEspace) {
        return axios
            .get(`${API_URL}/reservationsEspaces/${idReservation}&${idEspace}`, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
    }
    create(idReservation,idEspace,nbTable,nbM2) {
        return axios
            .post(`${API_URL}/reservationsEspaces`, { headers: authHeader(), idReservation,idEspace,nbTable,nbM2 })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
      }
    
      update(idReservation,idEspace,nbTable,nbM2) {
        return axios
            .put(`${API_URL}/reservationsEspaces/${idReservation}&${idEspace}`, { headers: authHeader(), idReservation,idEspace,nbTable,nbM2 })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
      }

}

export default new ReservationEspaceService();