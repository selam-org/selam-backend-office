import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  reports: [],
  isGetReportsLoading: false,
  getReportsError: {},
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    getReportsError: (state, action) => {
      state.getReportsError = action.payload;
    },
    getReportsLoading: (state, action) => {
      state.isGetReportsLoading = true;
    },
    getReportsSuccess: (state, action) => {
      state.reports = action.payload;
      state.isGetReportsLoading = false;
    },
  },
});

export const { getReportsError, getReportsLoading, getReportsSuccess } =
  reportSlice.actions;

export default reportSlice.reducer;

export const getCashiersApiCall =
  (startDate, endDate) => (dispatch, getState) => {
    const token = getState().entities.auth.userCred.token;

    dispatch(
      action.apiCallBegan({
        url: `orders/`,
        method: "get",
        onStart: getReportsLoading.type,
        onSuccess: getReportsSuccess.type,
        onFailed: getReportsSuccess.type,
        params: {
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    );
  };

export const getReports = createSelector(
  (state) => state.entities.report.reports,
  (reports) => reports
);

export const getReportsLoadingState = createSelector(
  (state) => state.entities.report.isGetReportsLoading,
  (isGetReportsLoading) => isGetReportsLoading
);

export const getReportsErrorState = createSelector(
  (state) => state.entities.report.getReportsError,
  (getReportsError) => getReportsError
);
