import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

const userReducer = function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };

    default:
      return state;
  }
};
export default userReducer;
