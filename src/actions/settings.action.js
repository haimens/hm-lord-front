import constant from "../constants/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";

export const findRealmDetailInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`realm/detail`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.REALM_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createRealmPaymentInLord = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`realm/payment`, "POST", body);
    await dispatch(findPaymentListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findPaymentListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`realm/all/payment`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.PAYMENT_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateAPaymentMethod = (payment_resource_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`realm/payment/${payment_resource_token}`, "PATCH", body);
    await dispatch(findPaymentListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createRealmMessageInLord = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`realm/message`, "POST", body);
    await dispatch(findMessageListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findMessageListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`realm/all/message`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.MESSAGE_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateMessageMethod = (message_resource_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`realm/message/${message_resource_token}`, "PATCH", body);
    await dispatch(findMessageListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createRealmEmailInLord = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`realm/email`, "POST", body);
    await dispatch(findEmailListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findEmailListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`realm/all/email`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.EMAIL_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateAEmailMethod = (email_resource_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`realm/email/${email_resource_token}`, "PATCH", body);
    await dispatch(findEmailListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const setPrimaryForResources = body => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`realm/resource`, "PATCH", {
      ...body
    });
    await dispatch(findRealmDetailInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

//key, value
export const createGeneralSettingInLord = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`setting/detail`, "POST", body);
    await dispatch(findGeneralSettingListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const findGeneralSettingListInLord = (query = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`setting/all/detail/realm`, "GET", null, {
      order_key: "udate",
      order_direction: "DESC",
      ...query
    });
    await dispatch({
      type: constant.GENERAL_SETTING_LIST_IN_LORD,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const updateGeneralSettingListInLord = (setting_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`setting/detail/${setting_token}`, "PATCH", body);
    await dispatch(findGeneralSettingListInLord());
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
