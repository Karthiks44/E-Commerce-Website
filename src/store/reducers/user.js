import axios from "axios";

const ACTION_PREFIX = "USER/";

const INIT_LOADING = ACTION_PREFIX + "INIT_LOAD";
const LOADING_DONE = ACTION_PREFIX + "LOADING_DONE";
const LOADING_ERR = ACTION_PREFIX + "LOADING_ERROR";

const loadUser = () => {
  return async (dispatch) => {
    dispatch({ type: INIT_LOADING });
    try {
      const res = await axios.get("https://fakestoreapi.com/users/1");
      dispatch({
        type: LOADING_DONE,
        payload: res.data
      });
    } catch (e) {
      dispatch({
        type: LOADING_ERR,
        payload: e
      });
    }
  };
};

const initialState = {
  isloading: false,
  loadError: null,
  data: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_LOADING:
      return {
        ...state,
        isloading: true,
        loadError: null,
        data: null
      };
    case LOADING_DONE:
      return {
        ...state,
        data: action.payload,
        isloading: false
      };
    case LOADING_ERR:
      return {
        ...state,
        isloading: false,
        loadError: action.payload
      };
    default:
      return state;
  }
}

export { loadUser };
