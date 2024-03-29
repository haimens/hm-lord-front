import constant from "../constants/constant";
import { callApi, startLoader, stopLoader } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findMessageListInLord = (query = {}) => async dispatch => {
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
      order_key: "cdate",
      order_direction: "DESC",
      ...query
    });
    let currDate = {
      record_list: payload.record_list.reverse(),
      count: payload.count,
      end: payload.end
    };
    await dispatch({
      type: constant.MESSAGE_DETAIL_WITH_CUSTOMER,
      payload: currDate,
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

export const createAMessageWithCustomer = (customer_token, body, bool) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`message/send/customer/${customer_token}`, "POST", body);
    if (!bool) {
      await dispatch(findMessageAndResetData(customer_token));
    }
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findMessageAndResetData = (customer_token, query = {}) => async dispatch => {
  try {
    await dispatch(setChatToFalse(customer_token));
    await startLoader(dispatch);
    const { payload } = await callApi(`message/all/detail/customer/${customer_token}`, "GET", null, {
      order_key: "cdate",
      order_direction: "DESC",
      ...query
    });
    let currDate = {
      record_list: payload.record_list.reverse(),
      count: payload.count,
      end: payload.end
    };
    await dispatch({
      type: constant.MESSAGE_DETAIL_WITH_CUSTOMER_RESET,
      payload: currDate,
      showChat: true
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateSmsStatus = (sms_token, body = {}, customer_token) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`message/detail/${sms_token}`, "PATCH", body);
    await dispatch(findMessageAndResetData(customer_token));
    await dispatch(findMessageListInLord());
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const setCustomerChat = payload => async dispatch => {
  try {
    await dispatch({
      type: constant.SET_CHAT_USER,
      payload
    });
    await dispatch(findMessageAndResetData(payload.customer_token));
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
