import axios from "axios";
import authHeader from '../authentification/auth-header';
import EspaceService from '../espace/espace'

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
    create(dateReservation, prix, remise, factureEnvoye, festival, participantReservation, dateModification) {
        return axios
            .post(`${API_URL}/reservations`, { headers: authHeader(), dateReservation, prix, remise, factureEnvoye, festival, participantReservation, dateModification })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

    update(idReservation, dateReservation, prix, remise, factureEnvoye, festival, participantReservation) {
        return axios
            .put(`${API_URL}/reservations/` + idReservation, { headers: authHeader(), idReservation, idReservation, dateReservation, prix, remise, factureEnvoye, festival, participantReservation })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

    getReservation(data) {
        return axios.get(`${API_URL}/festival/suiviExposant/reservation/${data.idReservation}`, { headers: authHeader() });
    }

    getEspacesReservesForReservation(data) {

        return axios.get(`${API_URL}/espaceReserve/${data.idReservation}`, { headers: authHeader() })

        /*
        return axios.get(`${API_URL}/festival//espacesReserves/`,
            { params: { idFestival: data.idFestival, idReservation: data.idReservation } },
            { headers: authHeader() });
        */
    }

    calculTotalNbTables(data) {

        let totalTables = 0
        data.map((reservation) => {
            totalTables = totalTables + reservation.nbTable
        })

        return totalTables
    }

    calculTotalM2(data) {

        let totalM2 = 0
        data.map((reservation) => {
            totalM2 = totalM2 + reservation.nbM2
        })

        return totalM2
    }



    calculPrixTotal(data) {
        let prixTotal = 0
        data.map((reservation) => {
            const prixM2 = reservation.espace.prixM2
            const prixUnitaireTable = reservation.espace.prixUnitaireTable
            prixTotal = prixTotal + reservation.nbM2 * prixM2 + reservation.nbTable * prixUnitaireTable
        })
        return prixTotal
    }

}

export default new ReservationService();