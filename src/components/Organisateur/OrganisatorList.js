import React, { useState, useEffect } from 'react'
import { Organisator } from './Organisator'
import List from '@material-ui/core/List';

export function OrganisatorList({organisators, fetchOrganisators}) {

    return (
        <div>
                <List>
                    {organisators ? organisators.map(organisator => <Organisator key={organisator._id} organisator={organisator} fetchOrganisators={fetchOrganisators}/>) : null}
                </List>
        </div>
    )
}