import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';


const AllAlerts = ({ alerts }) => {
    
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

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(AllAlerts)
