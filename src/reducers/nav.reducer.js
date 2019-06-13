import constant from "../constants/constant";

const initialState = {
  is_open: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.OPEN_SIDEBAR:
      return { ...state, is_open: !state.is_open };
    default:
      return state;
  }
};
