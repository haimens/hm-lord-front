import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findVehicleListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`car/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.VEHICLE_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createAVehicleInLord = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`car/detail`, "POST", body);
    await dispatch(findVehicleListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateACarInLord = (car_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`car/detail/${car_token}`, "PATCH", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findDriverListForACar = (car_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`car/all/driver/${car_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.DRIVER_LIST_FOR_A_CAR,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createCarToADriverInLord = (car_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`car/driver/${car_token}`, "POST", null, body);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateADriverForACar = (driver_car_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`car/driver/${driver_car_token}`, "PATCH", body);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
