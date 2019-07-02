import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findFeeList = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`tribute/all/rate`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.FEE_LIST,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createFeeRate = rate => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`tribute/rate`, "POST", {
      rate
    });
    await dispatch(findFeeList());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
