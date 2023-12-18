import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  logedIn: false,
  loginLoading: false,
  loginError: null,
  userCred: null,
  isLogoutLoading: false,
  logoutError: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginError: (auth, action) => {
      console.log(action);
      auth.loginLoading = false;
      auth.loginError = action.payload;
    },
    loginStart: (auth, action) => {
      console.log("loading");
      auth.loginLoading = true;
      auth.loginError = null;
    },
    loginSuccess: (auth, action) => {
      console.log("here in loginSuccess", action.payload);
      auth.userCred = action.payload;
      auth.loginLoading = false;
      auth.logedIn = true;
      auth.loginError = null;
    },
    // logout: (auth, action) => {
    //   auth.userCred = null;
    //   auth.logedIn = false;
    //   auth.isLogoutLoading = false;
    //   auth.logoutError = null;
    // },
    logoutError: (auth, action) => {
      auth.isLogoutLoading = false;
      auth.logoutError = action.payload;
    },
    logoutStart: (auth, action) => {
      auth.isLogoutLoading = true;
      auth.logoutError = null;
    },
  },
  extraReducers: (builder) => builder.addCase(logout, () => initialState),
});

export const {
  // logout,
  logoutError,
  logoutStart,
  loginSuccess,
  loginError,
  loginStart,
} = slice.actions;

export default slice.reducer;

export const login = (data) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: "auth/",
      onStart: loginStart.type,
      onSuccess: loginSuccess.type,
      onFailed: loginError.type,
      data: data,
      method: "post",
    })
  );
};

export const logoutApi = (data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;

  dispatch(
    action.apiCallBegan({
      url: "auth/logout/",
      onStart: logoutStart.type,
      onSuccess: logout.type,
      onFailed: logoutError.type,
      // data: data,
      method: "post",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getIsLogin = createSelector(
  (state) => state.entities.auth.logedIn,
  (logedIn) => logedIn
);

export const isLoginLoading = createSelector(
  (state) => state.entities.auth.loginLoading,
  (loginLoading) => loginLoading
);

export const isLogoutLoading = createSelector(
  (state) => state.entities.auth.isLogoutLoading,
  (isLogoutLoading) => isLogoutLoading
);

export const getLoginError = createSelector(
  (state) => state.entities.auth.loginError,
  (loginError) => loginError
);

export const getLogoutError = createSelector(
  (state) => state.entities.auth.logoutError,
  (logoutError) => logoutError
);

export const getLoggedinUser = createSelector(
  (state) => state.entities.auth.userCred,
  (userCred) => userCred
);
