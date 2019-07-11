import constant from "../constants/constant";

const initialState = {
  wage_list_in_driver: {
    record_list: [],
    count: 0,
    end: 0
  },
  wage_sum_list_in_driver: {
    sum: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.WAGE_LIST_IN_DRIVER:
      return { ...state, wage_list_in_driver: action.payload };
    case constant.WAGE_SUM_LIST_IN_DRIVER:
      return { ...state, wage_sum_list_in_driver: action.payload };
    default:
      return state;
  }
};
