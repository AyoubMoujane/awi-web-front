import React, { useState, useEffect } from "react";
import { Festival } from "../../components/Festival/Festival"
import { FestivalForm } from "../../components/Festival/FestivalForm"
import FestivalService from "../../services/festival/festival"



export function Festivals() {


    const [festivals, setFestivals] = useState(null)
    // const [error, setError] = useState(null)

    useEffect(function () {
        FestivalService.getFestivals().then(
            response => {
                setFestivals(response.data)
            },
            error => {
                // setError(error.response.data.message)
            }

        )
    }, [])

    return (
        <div>
            <FestivalForm />
            {festivals === null ? null : <FestivalList festivals={festivals} />}
        </div>
    )
}

function FestivalList({ festivals }) {
    return (
        <div>
            {festivals.map(festival => <Festival key={festival.idFestival} festival={festival} />)}
        </div>
    )
}