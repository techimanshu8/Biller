//Action alerting is done here, please refer to alert.js in reducer for state update
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../utils/consts';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    10000
  );
};
