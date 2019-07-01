import constant from "../constants/constant";

const initialState = {
  driver_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.DRIVER_LIST_IN_LORD:
      return { ...state, driver_list_in_lord: action.payload };
    default:
      return state;
  }
};
