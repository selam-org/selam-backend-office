import * as actions from "../api";
import axios from "axios";
import { logout } from "./auth";
const apiCall =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const {
      url,
      onStart,
      onFailed,
      onSuccess,
      data,
      method,
      params,
      headers,
      otherData,
    } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      console.log("final data", data);
      const response = await axios.request({
        baseURL: "https://backend-test-m35mmwjaya-uc.a.run.app/",
        url,
        method,
        data,
        params,
        headers,
      });
      // console.log(response.data, "here", method, url, response);
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess)
        dispatch({ type: onSuccess, payload: response.data, params });
      console.log(onSuccess, response.data);
    } catch (error) {
      console.log(error, "error");
      if (error.response && error.response.status === 401) {
        console.log("here in 401");
        dispatch(logout());
      }
      if (error.isAxiosError) {
        console.log(error, "error");
        let data;
        if (error.response) {
          data = error.response.data;
        } else {
          data = {
            detail: [error.message],
          };
        }
        dispatch(actions.apiCallFailed(data));
        if (onFailed)
          dispatch({
            type: onFailed,
            payload: data,
          });
      } else {
        dispatch(actions.apiCallFailed("error.message"));
        console.log("error 1", error.message);
        if (onFailed)
          dispatch({
            type: onFailed,
            payload: { non_field_erros: ["Something went wrong!"] },
          });
      }
    }
  };

export default apiCall;
