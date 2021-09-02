import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { Paper, Container, Grid, Button, Card, CardActions, CardContent, TextField, Link} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Background from '../../img/background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import store from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../action-creators/alert';
import { register } from '../../action-creators/auth';
import { Redirect } from 'react-router-dom';


const styles = {
    backgroundContainer: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center'
    },
    loginForm: {
        backgroundColor: 'white',
        backgroundPosition: 'center',
        minHeight: 475
    }
}

const useStyles = makeStyles({
    root: {
      width: 300,
      minHeight: 350,
      marginTop: 40,
      marginLeft: 200,
      marginRight: 200,
      marginBottom: 40,
      borderRadius: '10%'
    },
    formField: {
        marginLeft: 55,
        marginRight: 20,
        marginTop: 20,
        minWidth: 100
    },
    signIn: {
        marginLeft: 55,
        marginTop: 20,
        minWidth: 90
    }
  });

const Register = props => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match", 'error');
        } else {
            register({ name, email, password })
        }
    }
    const classes = useStyles();
    if (isAuth) {
        return <Redirect to="http://google.com" />
    }
    return (
        <Fragment>
            <Grid container justify="center" style={styles.backgroundContainer}>
                <Grid item className={classes.root} style={styles.loginForm}>
                    <br></br>
                    <Typography 
                        variant="subtitle1" 
                        align="center"
                    >Sign In</Typography>
                    <form onSubmit={e => handleSubmit(e)}>
                        <TextField 
                                className={classes.formField} 
                                variant="filled" 
                                label="Full Name" 
                                value={name} 
                                name="name"
                                onChange={e => onChange(e)}
                            />
                        <TextField 
                            className={classes.formField} 
                            variant="filled" 
                            label="Email" 
                            name="email" 
                            value={email}
                            onChange={e => onChange(e)}
                        />
                        <TextField 
                            className={classes.formField} 
                            variant="filled" 
                            label="Password" 
                            name="password" 
                            value={password}
                            onChange={e => onChange(e)}
                        />
                        <TextField 
                            className={classes.formField} 
                            variant="filled" 
                            label="Confirm Password" 
                            name="password2" 
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            className={classes.signIn}
                        >Register
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Fragment>
    )
}


export default Register;
