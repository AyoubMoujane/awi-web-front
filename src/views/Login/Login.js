import React, { useState } from "react";

import AuthService from "../../services/authentification/auth"
import history from "../../history"

export function Login() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = function (e) {
        setUsername(e.target.value)
    }

    const handleChangePassword = function (e) {
        setPassword(e.target.value)
    }


    const handleSubmit = function (e) {
        setErrors(null)
        setLoading(true)
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        AuthService.login(data.username, data.password).then(
            () => {
                history.push('/profile')
                window.location.reload();
            },
            error => {
                setErrors(error.response.data.message)
            }
        )

        setLoading(false)

    }
    return (
        <form className="container mt-4" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="row">
                <div className="input-field col s12">
                    <input id="username" type="text" className="validate" onChange={handleChangeUsername} required />
                    <label htmlFor="username">Username</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password" type="password" className="validate" onChange={handleChangePassword} required />
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            {errors && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {errors}
                    </div>
                </div>
            )}
            <button className="waves-effect waves-light btn" disabled={loading}>Login</button>
        </form>
    )
}