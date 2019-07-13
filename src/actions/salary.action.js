import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findSalaryListInDriver = (driver_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`salary/all/detail/driver/${driver_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.SALARY_LIST_IN_DRIVER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createSalaryInDriver = (driver_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`salary/detail/${driver_token}`, "POST", body);
    await dispatch(findSalaryListInDriver(driver_token));
    await dispatch(findSumSalaryInDriver(driver_token));
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findSumSalaryInDriver = driver_token => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`salary/sum/driver/${driver_token}`, "GET");
    await dispatch({
      type: constant.SALARY_SUM_LIST_IN_DRIVER,
      payload
    });
    await stopLoader(dispatch);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
