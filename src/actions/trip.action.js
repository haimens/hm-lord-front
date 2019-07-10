import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findTripListInDriver = (driver_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/all/detail/driver/${driver_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.TRIP_LIST_IN_DRIVER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findActiveTripListInDriver = (driver_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/all/active/driver/${driver_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.TRIP_ACTIVE_LIST_IN_DRIVER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findTripListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.TRIP_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findTripDetailInLord = trip_token => async dispatch => {
  try {
    console.log(trip_token);
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/detail/${trip_token}`, "GET");
    console.log(payload);
    await dispatch({
      type: constant.TRIP_DETAIL_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createAnAlertForATrip = (trip_token, body = {}) => async dispatch => {
  try {
    console.log(trip_token);
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/alerts/${trip_token}`, "POST", body);
    await dispatch(findTripDetailInLord(trip_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
