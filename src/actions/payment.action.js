import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const handleSubmitAPaymentInLord = (order_token, body = {}, history) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`payment/web/${order_token}`, "POST", body);
    await launchSuccess(dispatch);
    history.push("/order/list");
    await stopLoader(dispatch);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
