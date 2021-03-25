// import React, { useState } from "react";

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';



import AuthService from "../../services/authentification/auth"
import history from "../../history"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Polytech MONTPELLIER
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO : Handle errors

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
}));


export function Login() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = function (e) {
        setUsername(e.target.value)
    }

    const handleChangePassword = function (e) {
        setPassword(e.target.value)
    }

    const classes = useStyles();

    const handleSubmit = function (e) {
        setErrors(null)
        setLoading(true)

        const data = {
            username: username,
            password: password
        }

        AuthService.login(data.username, data.password)
            .then((data) => {
                setLoading(false)
                history.push('/profile')
                window.location.reload();
            })
            .catch((err) => {
                setLoading(false)
                setErrors(err.response.data.message)
            })

    }
    // return (
    //     <form className="container mt-4" onSubmit={handleSubmit}>
    //         <h2>Login</h2>
    //         <div className="row">
    //             <div className="input-field col s12">
    //                 <input id="username" type="text" className="validate" onChange={handleChangeUsername} required />
    //                 <label htmlFor="username">Username</label>
    //             </div>
    //         </div>
    //         <div className="row">
    //             <div className="input-field col s12">
    //                 <input id="password" type="password" className="validate" onChange={handleChangePassword} required />
    //                 <label htmlFor="password">Password</label>
    //             </div>
    //         </div>
    //         {errors && (
    //             <div className="form-group">
    //                 <div className="alert alert-danger" role="alert">
    //                     {errors}
    //                 </div>
    //             </div>
    //         )}
    //         <button className="waves-effect waves-light btn" disabled={loading}>Login</button>
    //     </form>
    // )

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nom utilisateur"
                        name="username"
                        autoFocus
                        onChange={handleChangeUsername}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChangePassword}
                    />

                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            Connexion
        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>

                    {/* <LoadingButton
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        pending={loading}
                    >
                        Connexion
          </LoadingButton> */}
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );

}