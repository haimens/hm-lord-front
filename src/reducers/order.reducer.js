import constant from "../constants/constant";

const initialState = {
  order_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  order_list_in_lord_with_date: {
    record_list: [],
    count: 0,
    end: 0
  },
  order_detail: {
    customer_info: {
      name: "",
      email: "",
      cell: ""
    },
    order_discount_list: []
  },
  current_order: {
    order_token: "ORD-f5764254208ece7dc05b092646d8d19a",
    trip_list: ["TRIP-8dbe9015d47421c346288e9e0e4ce1b3", "TRIP-13f63201b9b37287743ae990c532a61a"]
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.ORDER_LIST_IN_LORD:
      return { ...state, order_list_in_lord: action.payload };
    case constant.ORDER_LIST_IN_LORD_WITH_DATE:
      return { ...state, order_list_in_lord_with_date: action.payload };
    case constant.ORDER_DETAIL:
      return { ...state, order_detail: action.payload };
    case constant.CURRENT_ORDER:
      return { ...state, current_order: action.payload };
    default:
      return state;
  }
};
