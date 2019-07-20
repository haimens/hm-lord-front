import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findOrderListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.ORDER_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findCustomerOrderListInLord = (customer_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/all/detail/customer/${customer_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.ORDER_LIST_IN_CUSTOMER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findOrderListInLordWithDate = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      from_key: "cdate",
      to_key: "cdate",
      ...query
    });
    await dispatch({
      type: constant.ORDER_LIST_IN_LORD_WITH_DATE,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findOrderDetailInLord = order_token => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/detail/${order_token}`, "GET");
    await dispatch({
      type: constant.ORDER_DETAIL,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createOrderInLord = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/detail`, "POST", body);
    await dispatch({
      type: constant.CURRENT_ORDER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const setCurrentOrderInLord = order_token => async dispatch => {
  try {
    await startLoader(dispatch);
    await dispatch({
      type: constant.CURRENT_ORDER,
      payload: { order_token }
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createOrderDiscountInLord = (order_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`order/discount/${order_token}`, "POST", body);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateOrderDiscountInLord = (order_token, order_discount_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`order/discount/${order_token}/${order_discount_token}`, "PATCH", body);
    await dispatch(findOrderDetailInLord(order_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const applyOrderDiscountInLord = (order_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`order/discount/${order_token}`, "POST", body);
    await dispatch(findOrderDetailInLord(order_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const applyFinalOrder = order_token => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`order/finalize/${order_token}`, "PATCH");
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateOrderDetailInLord = (order_token, body, bool) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`order/detail/${order_token}`, "PATCH", body);
    if (!bool) {
      await dispatch(findOrderDetailInLord(order_token));
      await launchSuccess(dispatch);
    }
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const cancelOrder = (order_token, history) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`order/cancel/${order_token}`, "PATCH");
    await launchSuccess(dispatch);
    history.push("/order/list");
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const confirmOrder = order_token => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`order/confirm/${order_token}`, "PATCH");
    await launchSuccess(dispatch);
    await dispatch(findOrderDetailInLord(order_token));
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const setCurrentCustomerInLord = payload => async dispatch => {
  try {
    await startLoader(dispatch);
    await dispatch({
      type: constant.SET_CURRENT_CUSTOMER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
