import constant from "../constants/constant";

const initialState = {
  coupon_list_in_settings: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.COUPON_LIST_IN_SETTINGS:
      return { ...state, coupon_list_in_settings: action.payload };
    default:
      return state;
  }
};
