import constant from "../constants/constant";

const initialState = {
  order_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.ORDER_LIST_IN_LORD:
      return { ...state, order_list_in_lord: action.payload };
    default:
      return state;
  }
};