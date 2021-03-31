import React, { useEffect } from "react";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AuthService from "../../services/authentification/auth";

import { useDispatch } from 'react-redux'
import { fetchFestivals } from "../../redux/actions/festival/festivalActions"

export function Profile() {

    const dispatch = useDispatch()
    useEffect(() => dispatch(fetchFestivals()), [])

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