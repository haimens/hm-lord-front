import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findQuoteInLord = (body = {}) => async dispatch => {
  console.log(body);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`quote/detail`, "POST", body);
    await dispatch({
      type: constant.QUOTE_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findQuoteInLordAgain = (body = {}) => async dispatch => {
  console.log(body);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`quote/detail`, "POST", body);
    await dispatch({
      type: constant.QUOTE_IN_LORD_AGAIN,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
