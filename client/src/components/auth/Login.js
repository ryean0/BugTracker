import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { Grid, Button, TextField, Link} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Background from '../../img/background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { setAlert } from '../../action-creators/alert';
import { useDispatch } from 'react-redux';
import store from '../../store';


const styles = {
    backgroundContainer: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center'
    },
    loginForm: {
        backgroundColor: 'white',
        backgroundPosition: 'center'
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
    },
    demoAcc: {
        marginLeft: 10,
        marginTop: 20,
        minWidth: 90
    },
    links: {
        marginLeft: 55,
        marginBottom: 20,
    },
    container: {
        marginTop: 0
    }
    
  });

const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    //const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <Fragment>
            <Grid container justify="center" style={styles.backgroundContainer}>
                <Grid item className={classes.root} style={styles.loginForm}>
                    <br></br>
                    <Typography 
                        variant="subtitle1" 
                        align="center"
                    >Sign In</Typography>
                    <form onSubmit={e => alert('Hello')}>
                        <TextField 
                            className={classes.formField} 
                            variant="filled" 
                            label="Email" 
                            value={email} 
                            name="email"
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

                        <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            className={classes.signIn}
                        >Sign In
                        </Button>
                        <Button
                        variant="contained"
                        size="medium"
                        className={classes.demoAcc}
                        >Demo
                        </Button>
                        
                    </form>
                    <br></br>
                    <Link 
                        className={classes.links}
                        href="forgot-password"
                    >Forgot Password?</Link>
                    <br></br>
                    <Link 
                        className={classes.links}
                        href="/register"
                    >Create a New Account</Link>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Login
