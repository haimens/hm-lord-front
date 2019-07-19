import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const sendEmailToConfirm = (customer_token, body = {}, history, order_token) => async dispatch => {
  console.log(customer_token);
  console.log(body);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`email/send/customer/${customer_token}`, "POST", body);
    history.push(`/order/detail/${order_token}`);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
