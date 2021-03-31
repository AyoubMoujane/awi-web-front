import React from 'react'
import { Zone } from './Zone'

export function ZoneList({ zones }) {

    return (
        <div>
            {zones.map(zone => <Zone key={zone.idZone} zone={zone} />)}
        </div>
    )
}