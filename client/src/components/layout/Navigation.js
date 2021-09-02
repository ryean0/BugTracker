import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  dashLinks: {
      marginLeft: 30,
  }
}));

const Navigation = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Dashboard
            </Typography>
            <Typography>
                <Link href="/" color="inherit" className={classes.dashLinks}>
                    Login
                </Link>
                <Link href="/register" color="inherit" className={classes.dashLinks}>
                    Register
                </Link>
            </Typography>
            
            </Toolbar>
        </AppBar>
    </div>
    )
}

Navigation.propTypes = {

}

export default Navigation
