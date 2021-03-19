import React, { useState } from "react";

import ParticipantItem from "../../components/Participant/ParticipantItem"

export function ParticipantsView() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <div>
            <ParticipantItem />
        </div>
    )
}