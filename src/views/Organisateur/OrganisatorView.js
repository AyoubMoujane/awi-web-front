import React, { useState, useEffect, useCallback } from 'react'
import { OrganisatorList } from '../../components/Organisateur/OrganisatorList'
import { OrganisatorForm } from '../../components/Organisateur/OrganisatorForm'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'

import UserService from '../../services/user/user'



export function OrganisatorView() {

    const [organisators, setOrganisators] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    const fetchOrganisators = useCallback(() => {
        setLoading(true)
        UserService.getAllOrganisators().then(
            response => {
                setOrganisators(response.data.users)
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }
        )
    })


    useEffect(fetchOrganisators, [])

    // const [organisators, setOrganisators] = useState(null)

    // const deleteOrganisator = (organisator) => {
    //     setLoading(true)
    //     UserService.deleteOrganisator(organisator).then(
    //         () => {
    //             // handleClose()
    //         }
    //     )
    //     setLoading(false)

    // }


    return (
        <div>
            <Container maxWidth="xl">
                <OrganisatorForm fetchOrganisators={fetchOrganisators} />
                <br/>
                <Typography variant="h3" gutterBottom>
                    Liste des organisateurs
            </Typography>
                {loading ?
                    <CircularProgress />
                    :
                    <OrganisatorList organisators={organisators} fetchOrganisators={fetchOrganisators} />
                }
            </Container>
        </div>
    )
}