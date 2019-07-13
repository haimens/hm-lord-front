import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";
import constant from "../constants/constant";

export const findCouponListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`discount/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.COUPON_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createACouponInLord = (body = {}) => async dispatch => {
  console.log(body);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`discount/detail`, "POST", body);
    await dispatch(findCouponListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateACouponInLord = (discount_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`discount/${discount_token}`, "PATCH", body);
    await dispatch(findCouponListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
