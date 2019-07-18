import constant from "../constants/constant";

const initialState = {
  alert_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.ALERT_LIST_IN_CUSTOMER:
      return { ...state, alert_list_in_lord: action.payload };
    default:
      return state;
  }
};
