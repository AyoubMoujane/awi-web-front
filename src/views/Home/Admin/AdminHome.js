import React, { useState, useEffect } from "react";
import AuthService from "../../../services/authentification/auth";
import UserService from '../../../services/user/user'

export function AdminHome() {


    const currentUser = AuthService.getCurrentUser()

    const [content, setContent] = useState("")
    const [error, setError] = useState(null)

    useEffect(function () {
        UserService.getAdminHome().then(
            response => {
                setContent(response.data.message)
            },
            error => {
                setError(error.response.data.message)
            }
        )
    })

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Home
                    </h3>
            </header>
                {error ? (
                    <div>
                        {error}
                    </div>
                ): (
                    <div>
                        {content}
                    </div>
                )}
        </div>
    )
}