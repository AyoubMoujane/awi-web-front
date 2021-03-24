import axios from "axios";
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class JeuService {
    findAll() {
        return axios
            .get(`${API_URL}/jeux`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }
    getEditeurs() {
        return axios
            .get(`${API_URL}/jeux`, { headers: authHeader() })
            .then(response => {
                return response.data.map(jeu=>jeu.participant.nomParticipant).filter((v, i, a) => a.indexOf(v) === i)
            })
            .catch(err => {
                throw err
            })
    }
    getJeuType() {
        return axios
            .get(`${API_URL}/jeux`, { headers: authHeader() })
            .then(response => {
                return response.data.map(jeu=>jeu.jeuType.nomType).filter((v, i, a) => a.indexOf(v) === i)
            })
            .catch(err => {
                throw err
            })
    }

    delete(id) {
        return axios
            .delete(`${API_URL}/jeux/${id}`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }



    get(id) {
        return axios
            .get(`${API_URL}/jeux/${id}`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }
    createJeu(nomJeu,nbJoueurMin,nbJoueurMax,age,duree,consigne,prototype,type,editeur) {
        return axios
            .post(`${API_URL}/jeux`, { headers: authHeader(), nomJeu,nbJoueurMin,nbJoueurMax,age,duree,consigne,prototype,type,editeur })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
      }
    
      update(idJeu,nomJeu,nbJoueurMin,nbJoueurMax,age,duree,consigne,prototype,type,editeur) {
        return axios
            .put(`${API_URL}/jeux/`+idJeu, { headers: authHeader(), idJeu,nomJeu,nbJoueurMin,nbJoueurMax,age,duree,consigne,prototype,type,editeur })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
      }

}

export default new JeuService();