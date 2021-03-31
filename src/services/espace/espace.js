import axios from "axios";
import authHeader from '../authentification/auth-header';

const config = require('../../config')
const API_URL = config.API_URL

class EspaceService {
    getAllEspaces() {
        return axios
            .get(`${API_URL}/espace`, { headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err
            })
    }

    getEspace(idEspace){
        return axios.get(`${API_URL}/espace/${idEspace}`, { headers: authHeader() })
    }


}

export default new EspaceService();