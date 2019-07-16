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
export const findTripActiveListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/all/active/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.TRIP_ACTIVE_LIST_IN_LORD,
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
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/detail/${trip_token}`, "GET");
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
export const findTripDetailInLordAgain = trip_token => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/detail/${trip_token}`, "GET");
    await dispatch({
      type: constant.TRIP_DETAIL_IN_LORD_AGAIN,
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

export const updateTripOperationInfo = (trip_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/operation/${trip_token}`, "PATCH", body);
    await dispatch(findTripDetailInLord(trip_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateTripBasicInfo = (trip_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/detail/${trip_token}`, "PATCH", body);
    await dispatch(findTripDetailInLord(trip_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createAddonToTrip = (order_token, trip_token, position, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/addon/${order_token}/${trip_token}`, "POST", body);
    if (position === "first") {
      await dispatch(findTripDetailInLord(trip_token));
    }
    if (position === "second") {
      await dispatch(findTripDetailInLordAgain(trip_token));
    }
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const deleteAddonItem = (order_token, trip_token, addon_token, position) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/addon/${order_token}/${trip_token}/${addon_token}`, "PATCH", { status: 0 });
    if (position === "first") {
      await dispatch(findTripDetailInLord(trip_token));
    }
    if (position === "second") {
      await dispatch(findTripDetailInLordAgain(trip_token));
    }
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findTripCountInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/count/realm/`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.TRIP_COUNT_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
