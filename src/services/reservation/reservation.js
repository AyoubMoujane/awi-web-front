import axios from "axios";
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class ReservationService {
    findAll() {
        return axios
            .get(`${API_URL}/reservations`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }
   

    delete(id) {
        return axios
            .delete(`${API_URL}/reservations/${id}`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }



    get(id) {
        return axios
            .get(`${API_URL}/reservations/${id}`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }
    create(dateReservation,prix,remise,factureEnvoye,festival,participantReservation,dateModification) {
        return axios
            .post(`${API_URL}/reservations`, { headers: authHeader(), dateReservation,prix,remise,factureEnvoye,festival,participantReservation, dateModification })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
      }
    
      update(idReservation,dateReservation,prix,remise,factureEnvoye,festival,participantReservation) {
        return axios
            .put(`${API_URL}/reservations/`+idReservation, { headers: authHeader(), idReservation,idReservation,dateReservation,prix,remise,factureEnvoye,festival,participantReservation })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
      }

}

export default new ReservationService();