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

export const createOrderDiscountInLord = (order_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/discount/${order_token}`, "POST", body);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateOrderDiscountInLord = (order_token, order_discount_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/discount/${order_token}/${order_discount_token}`, "PATCH", body);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
