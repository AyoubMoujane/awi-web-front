import axios from "axios";
import authHeader from './auth-header';
const config = require('../../config')


const API_URL = config.API_URL

console.log(API_URL)
console.log(process.env.NODE_ENV)

class AuthService {
    login(username, password) {
        return axios
            .post(`${API_URL}/auth/signin`, {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    registerOrganisator(data) {
        return axios.post(`${API_URL}/auth/signup`, 
            data,
            { headers: authHeader() }
        );
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();