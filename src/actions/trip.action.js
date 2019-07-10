import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findDriverListInLord = (driver_token, query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`trip/all/detail/driver/${driver_token}`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.TRIP_LIST_IN_DRIVER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
