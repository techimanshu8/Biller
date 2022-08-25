import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { REMOVE_ALERT } from '../../utils/consts';

const Alerts = () => {
  const alerts = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  return (
    <div>
      <Fragment>
        {alerts &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <Alert
              className="fade error-alert slide-in-top"
              dismissible={true}
              onClose={() =>
                dispatch({
                  type: REMOVE_ALERT,
                  payload: alert.id,
                })
              }
              variant={alert.alertType}
              key={alert.id}
              style={{ zIndex: 99 }}
            >
              {alert.msg}
            </Alert>
          ))}
      </Fragment>
    </div>
  );
};

export default Alerts;
