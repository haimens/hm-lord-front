import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findCustomerListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`customer/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.CUSTOMER_LIST_IN_LORD,
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
    const { payload } = await callApi(`customer/detail`, "POST", body);
    await dispatch(findCustomerListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateADriverInLord = (customer_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`customer/detail/${customer_token}`, "PATCH", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateACustomerDetailInLord = (customer_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`customer/info/${customer_token}`, "PATCH", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
