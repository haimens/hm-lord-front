import constant from "../constants/constant";

const initialState = {
  salary_list_in_driver: {
    record_list: [],
    count: 0,
    end: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.SALARY_LIST_IN_DRIVER:
      return { ...state, salary_list_in_driver: action.payload };

    default:
      return state;
  }
};
