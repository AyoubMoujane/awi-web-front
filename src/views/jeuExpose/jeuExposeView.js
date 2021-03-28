// import React, { useState, useEffect, useCallback } from 'react'
// import { JeuExposeList } from '../../components/JeuExpose/JeuExposeList'
// import { JeuExposeForm } from '../../components/jeuExpose/JeuExposeForm'
// import Typography from '@material-ui/core/Typography'
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Container from '@material-ui/core/Container'
// import JeuExposeService from '../../services/jeuExpose/jeuExpose'



// export function JeuExposeView(idReservation, idJeu) {

//     const [jeuxExposes, setJeuxExposes] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null)



//     const fetchJeuxExposes = useCallback(() => {
//         setLoading(true)
//         JeuExposeService.get(idReservation, idJeu).then(
//             response => {
//                 setJeuxExposes(response)
//                 setLoading(false)
//             },
//             error => {
//                 setError(error.response)
//                 setLoading(false)
//             }
//         )
//     })


//     useEffect(fetchJeuxExposes, [])

//     return (
//         <div>
//             <Container maxWidth="xl">
//                 <JeuExposeForm fetchJeuxExposes={fetchJeuxExposes} />
//                 <br/>
//                 <Typography variant="h3" gutterBottom>
//                     Liste des jeux exposés
//                 </Typography>
//                 {loading ?
//                     <CircularProgress />
//                     :
//                     <JeuExposeList jeuxExposes={jeuxExposes} fetchJeuxExposes={fetchJeuxExposes} />
//                 }
//             </Container>
//         </div>
//     )
// }