import React, { useState } from "react";

import AuthService from "../../services/authentification/auth"
import history from "../../history"

export function Register() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleChangeUsername = function (e) {
        setUsername(e.target.value)
    }

    const handleChangeEmail = function (e) {
        setEmail(e.target.value)
    }

    const handleChangePassword = function (e) {
        setPassword(e.target.value)
    }

    const handleChangePassword2 = function (e) {
        setPassword2(e.target.value)
    }

    const handleSubmit = function (e) {
        setError(null)
        setLoading(true)
        e.preventDefault();


        const data = {
            username: username,
            email: email,
            password: password,
            password2: password2
        }

        console.log(data)

        AuthService.register(data.username, data.email, data.password, data.password2).then(
            () => {
                history.push('/login')
                window.location.reload();
            },
            error => {
                setError(error.response.data.message)
            }
        )

        setLoading(false)
    }


    return (
        <form className="container mt-4" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="row">
                <div className="input-field col s12">
                    <input id="username" type="text" className="validate" onChange={handleChangeUsername} required />
                    <label htmlFor="username">Username</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" type="email" className="validate" onChange={handleChangeEmail} required />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password" type="password" className="validate" onChange={handleChangePassword} required />
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password2" type="password" className="validate" onChange={handleChangePassword2} required />
                    <label htmlFor="password2">Confirm password</label>
                </div>
            </div>
            {error && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            )}
            <button className="waves-effect waves-light btn" disabled={loading}>Sign Up</button>
        </form>
    );
}
