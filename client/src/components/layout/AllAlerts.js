import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';


const AllAlerts = () => {
    const alerts = useSelector((state) => state.alert);
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
export default AllAlerts
