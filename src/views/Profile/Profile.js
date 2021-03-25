import React from "react";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AuthService from "../../services/authentification/auth";

export function Profile() {


    const currentUser = AuthService.getCurrentUser()

    return (
        <div>
            <Container maxWidth="sm">
                <Card>
                    <CardContent>

                        <h3>
                            <strong>{currentUser.username}</strong> Profile
                        </h3>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.roles &&
                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}