import axios from "axios";
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class JeuExposeService {
    findAll() {
        return axios
            .get(`${API_URL}/jeuxExposes`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }
   

    delete(idReservation, idJeu) {
        return axios
            .delete(`${API_URL}/jeuxExposes/${idReservation}&${idJeu}`, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
    }



    get(idReservation, idJeu) {
        return axios
            .get(`${API_URL}/jeuxExposes/${idReservation}&${idJeu}`, { headers: authHeader() })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
    }
    create(idReservation,idJeu,quantiteExpose,quantiteDonation,quantiteTombola,estAmene,estRecu,estARenvoye,aEteRenvoye,estPlace,zone) {
        return axios
            .post(`${API_URL}/jeuxExposes`, { headers: authHeader(), idReservation,idJeu,quantiteExpose,quantiteDonation,quantiteTombola,estAmene,estRecu,estARenvoye,aEteRenvoye,estPlace,zone })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
      }
    
      update(idReservation,idJeu,quantiteExpose,quantiteDonation,quantiteTombola,estAmene,estRecu,estARenvoye,aEteRenvoye,estPlace,zone) {
        return axios
            .put(`${API_URL}/jeuxExposes/${idReservation}&${idJeu}`, { headers: authHeader(), idReservation,idJeu,quantiteExpose,quantiteDonation,quantiteTombola,estAmene,estRecu,estARenvoye,aEteRenvoye,estPlace,zone })
            .then(response => {
                return response;
            })
            .catch(err => {
                throw err
            })
      }

}

export default new JeuExposeService();