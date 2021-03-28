import React, { useState, useEffect } from 'react'
import { JeuExpose } from './JeuExpose'
import List from '@material-ui/core/List';

export function JeuExposeList({jeuxExposes,fetchJeuxExposes}) {

    return (
        <div>
                <List>
                    {jeuxExposes ? jeuxExposes.map(jeuExpose => <JeuExpose key={jeuxExposes.idReservation} jeuExpose={jeuExpose} fetchJeuxExposes={fetchJeuxExposes}/>) : null}
                </List>
        </div>
    )
}