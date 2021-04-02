import React, { useState, useEffect } from 'react'
import { Reservation } from './Reservation'
import List from '@material-ui/core/List';

export function ReservationList({reservations, fetchReservations}) {

    // console.log(reservations)

    return (
        <div>
                <List>
                    {reservations ? reservations.map(reservation => <Reservation key={reservation.idReservation} reservation={reservation} fetchReservations={fetchReservations}/>) : null}
                </List>
        </div>
    )
}