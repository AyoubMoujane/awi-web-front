import axios from 'axios';
import authHeader from '../authentification/auth-header';
const config = require('../../config')

const API_URL = config.API_URL

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'landing');
    }

    getOrganisatorHome() {
        return axios.get(API_URL + 'organisator/home', { headers: authHeader() });
    }

    getAdminHome() {
        return axios.get(API_URL + 'admin/home', { headers: authHeader() });
    }

    getFestivals() {
        return axios.get('http://localhost:8080/api/festivals', { headers: authHeader() });
    }

    
    setEspace(nbTableMax, prixUnitaireTable, prixM2, festivalE, typeEspace){
        return axios.post('http://localhost:8080/api/espaces', { 
            nbTableMax, 
            prixUnitaireTable, 
            prixM2, 
            festivalE, 
            typeEspace 
        })
    }


    setFestival(nomFestival, dateFestival, estCourant, nbTableEntree, nbTableAccueil, nbTableBuvette, prixTableEntree, prixTableAccueil, prixTableBuvette, prixM2Entree, prixM2Accueil, prixM2Buvette) {
        return axios
            .post('http://localhost:8080/api/festivals', { 
                nomFestival, 
                dateFestival, 
                estCourant, 
                headers: authHeader() 
            })
            .then(response => {
                const idFestival = response.data.data.idFestival
                this.setEspace(nbTableEntree, prixTableEntree, prixM2Entree, idFestival, 1)
                this.setEspace(nbTableAccueil, prixTableAccueil, prixM2Accueil, idFestival, 2)
                this.setEspace(nbTableBuvette, prixTableBuvette, prixM2Buvette, idFestival, 3)
            })
    }
}

export default new UserService();