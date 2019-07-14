import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";
import constant from "../constants/constant";

export const handleSubmitAPaymentInLord = (order_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`payment/web/${order_token}`, "PATCH", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
