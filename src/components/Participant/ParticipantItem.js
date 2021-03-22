import React from 'react'

export default function ParticipantItem(props) {
    const { idParticipant, nomParticipant, editeurSeulement } = props.data

    return (
        <div>
            <p>participantItem</p>
            <p>{idParticipant}</p>
            <p>{nomParticipant}</p>
            <p>{editeurSeulement}</p>
        </div>
    )
}
