import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findDriverListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`driver/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.DRIVER_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createADriverInLord = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`driver/detail`, "POST", body);
    await dispatch(findDriverListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findDriverDetailInLord = driver_token => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`driver/detail/${driver_token}`, "GET");
    await dispatch({
      type: constant.DRIVER_DETAIL_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateADriverInLord = (driver_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`driver/detail/${driver_token}`, "PATCH", body);
    await dispatch(findDriverDetailInLord(driver_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findDriverLocationListInLord = (realm_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`driver/all/location/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.DRIVER_LOCATION_LIST_IN_LORD,
      payload,
      showMap: true
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const setDriverLocationMapToFalse = (realm_token, query = {}) => async dispatch => {
  try {
    await dispatch({
      type: constant.DRIVER_LOCATION_LIST_IN_LORD_MAP_FALSE,
      showMap: false
    });
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createDriverToACarInLord = (driver_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`driver/car/${driver_token}`, "POST", body);
    await dispatch(findCarListForADriver(driver_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findCarListForADriver = (driver_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`driver/all/car/${driver_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.CAR_LIST_FOR_A_DRIVER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateACarForADriver = (driver_token, driver_car_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`driver/car/${driver_car_token}`, "PATCH", { ...body });
    await dispatch(findCarListForADriver(driver_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findDriverPayableListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`driver/all/payable/realm`, "GET", null, {
      ...query
    });
    await dispatch({
      type: constant.DRIVER_PAYABLE_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
