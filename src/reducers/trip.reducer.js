import constant from "../constants/constant";

const initialState = {
  trip_list_in_driver: {
    record_list: [],
    count: 0,
    end: 0
  },
  trip_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.TRIP_LIST_IN_DRIVER:
      return { ...state, trip_list_in_driver: action.payload };
    case constant.TRIP_LIST_IN_LORD:
      return { ...state, trip_list_in_lord: action.payload };
    default:
      return state;
  }
};
