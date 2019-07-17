import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findCustomerNoteListInLord = (customer_token, query = {}) => async dispatch => {
  console.log(customer_token);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`note/all/detail/customer/${customer_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.NOTE_LIST_FOR_CUSTOMER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createCustomerNoteListInLord = (customer_token, body = {}) => async dispatch => {
  console.log(customer_token);
  console.log(body);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`note/detail/customer/${customer_token}`, "POST", body);
    await dispatch(findCustomerNoteListInLord(customer_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
export const findTripNoteListInLord = (trip_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`note/all/detail/trip/${trip_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.NOTE_LIST_FOR_TRIP,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createTripNoteListInLord = (trip_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`note/detail/trip/${trip_token}`, "POST", body);
    await dispatch(findTripNoteListInLord(trip_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findOrderNoteListInLord = (order_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`note/all/detail/order/${order_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.NOTE_LIST_FOR_ORDER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createOrderNoteListInLord = (order_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`note/detail/order/${order_token}`, "POST", body);
    await dispatch(findOrderNoteListInLord(order_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
