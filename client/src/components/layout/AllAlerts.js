import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';


const AllAlerts = () => {
    const alerts = useSelector((state) => state.alert)
    
    return (
        <div>
            {alerts.map(alert => (
                <Alert 
                    key={alert.id}
                    variant="filled"
                    severity={alert.alertType}
                >{alert.msg}
                </Alert>
            ))}
        </div>
    )
}

export default AllAlerts;
