import React, { useState } from "react";

import ParticipantItem from "../../components/Participant/ParticipantItem"

export function ParticipantsView() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    const fakeParticipants = [
        {
            idParticipant: 1,
            nomParticipant: "Ankama",
            editeurSeulement: 0
        }, {
            idParticipant: 2,
            nomParticipant: "Asmodee",
            editeurSeulement: 0
        }, {
            idParticipant: 3,
            nomParticipant: "Gigamic",
            editeurSeulement: 1
        }
    ]


    return (
        <div>
            <p>Participants</p>

            {fakeParticipants.map(function (item, i) {
                return <ParticipantItem key={i} data={item} />
            })}


        </div>
    )
}