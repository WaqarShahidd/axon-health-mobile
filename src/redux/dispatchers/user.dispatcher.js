import axios from "axios";
import { BASE_URL } from "../../constants/config";

export const getUserById =
  (userId = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "userByIdRequest",
      });
      const { data } = await axios.get(
        `${BASE_URL}/user/getSpecificUser?userId=${userId}`,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "userByIdSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "userByIdFailure",
        payload: error,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(`${BASE_URL}/user/logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "logoutSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error,
    });
  }
};

export const clearUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "clearUserData",
    });
  } catch (error) {}
};
