import constant from "../constants/constant";

const initialState = {
  order_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  order_detail: {},
  current_order: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.ORDER_LIST_IN_LORD:
      return {
        ...state,
        order_list_in_lord: {
          record_list: [...state.order_list_in_lord.record_list, ...action.payload.record_list],
          count: action.payload.count,
          end: action.payload.end
        }
      };
    case constant.ORDER_DETAIL:
      return { ...state, order_detail: action.payload };
    case constant.CURRENT_ORDER:
      return { ...state, current_order: action.payload };
    default:
      return state;
  }
};
