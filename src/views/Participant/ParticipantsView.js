import React from "react";

import ParticipantList from "../../components/Participant/ParticipantList"
import ParticipantForm from "../../components/Participant/ParticipantForm"

export function ParticipantsView() {
    return (
        <div>
            <ParticipantForm />
            <ParticipantList />
        </div>
    )
}