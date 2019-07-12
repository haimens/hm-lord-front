import constant from "../constants/constant";

const initialState = {
  flight_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  flight_list_in_lord_again: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.FLIGHT_LIST_IN_LORD:
      return { ...state, flight_list_in_lord: action.payload };
    case constant.FLIGHT_LIST_IN_LORD_AGAIN:
      return { ...state, flight_list_in_lord_again: action.payload };
    default:
      return state;
  }
};
