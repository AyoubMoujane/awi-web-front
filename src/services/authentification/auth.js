import axios from "axios";
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

    register(username, email, password, password2) {
        return axios.post(`${API_URL}/auth/signup`, {
            username,
            email,
            password,
            password2
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();