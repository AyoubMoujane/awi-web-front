import React, { useState } from "react";
import { DataGrid } from '@material-ui/data-grid';


import ParticipantItem from "../../components/Participant/ParticipantItem"
import ParticipantForm from "../../components/Participant/ParticipantForm"

export function ParticipantsView() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nomParticipant', headerName: 'Nom', width: 130 },
        { field: 'editeurSeulement', headerName: 'Éditeur seulement', width: 130 }
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        // },
    ];

    const fakeParticipants = [
        {
            id: 1,
            nomParticipant: "Ankama",
            editeurSeulement: 0
        }, {
            id: 2,
            nomParticipant: "Asmodee",
            editeurSeulement: 0
        }, {
            id: 3,
            nomParticipant: "Gigamic",
            editeurSeulement: 1
        }
    ]



    return (
        <div style={{ height: 400, width: '100%' }}>
            <ParticipantForm />
            <p>Participants</p>
            <DataGrid rows={fakeParticipants} columns={columns} pageSize={5} checkboxSelection />
        </div>
    )
}