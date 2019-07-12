import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";
export const findWageListInDriver = (driver_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`wage/all/detail/driver/${driver_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.WAGE_LIST_IN_DRIVER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createWageInDriver = (driver_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`wage/detail/${driver_token}`, "POST", body);
    await dispatch(findWageListInDriver(driver_token));
    await dispatch(findSumWageInDriver(driver_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findSumWageInDriver = driver_token => async dispatch => {
  try {
    await startLoader(dispatch);
    const salary = await callApi(`wage/sum/driver/${driver_token}`, "GET", null, { type: 1 });
    const fine = await callApi(`wage/sum/driver/${driver_token}`, "GET", null, { type: 2 });
    await dispatch({
      type: constant.WAGE_SUM_LIST_IN_DRIVER,
      payload: { sum: salary.payload.sum - fine.payload.sum }
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
