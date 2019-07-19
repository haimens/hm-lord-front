import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const sendEmailToConfirm = (customer_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`email/send/customer/${customer_token}`, "POST", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
