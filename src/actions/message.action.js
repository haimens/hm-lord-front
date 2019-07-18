import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findMessageListInLord = (query = {}) => async dispatch => {
  console.log(query);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`message/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.MESSAGE_LIST_IN_CUSTOMER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findMessageDetailWithCustomer = (customer_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`message/all/detail/customer/${customer_token}`, "GET", null, {
      ...query
    });
    await dispatch({
      type: constant.MESSAGE_DETAIL_WITH_CUSTOMER,
      payload,
      showChat: true
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const setChatToFalse = customer_token => async dispatch => {
  try {
    await startLoader(dispatch);
    await dispatch({
      type: constant.SET_CHAT_TO_FALSE
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createAMessageWithCustomer = (customer_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`message/send/customer/${customer_token}`, "POST", body);
    await dispatch(findMessageDetailWithCustomer(customer_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
