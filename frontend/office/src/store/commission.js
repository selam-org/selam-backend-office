import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  commissions: {},
  isGetCommissionLoading: false,
  getCommissionError: {},
  isUpdateCommissionLoading: false,
  updateCommissionError: {},
};

const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {
    getCommissionError: (state, action) => {
      state.getCommissionError = action.payload;
    },
    getCommissionLoading: (state, action) => {
      state.isGetCommissionLoading = true;
    },
    getCommissionSuccess: (state, action) => {
      const { id, commissions } = action.payload;
      state.commissions[id] = commissions;
      state.isGetCommissionLoading = false;
    },
    updateCommissionError: (state, action) => {
      state.updateCommissionError = action.payload;
    },
    updateCommissionLoading: (state, action) => {
      state.isUpdateCommissionLoading = true;
    },
    updateCommissionSuccess: (state, action) => {
      const { id, commissions } = action.payload;
      state.commissions[id] = commissions;
      state.isUpdateCommissionLoading = false;
    },
    extraReducers: (builder) => builder.addCase(logout, () => initialState),
  },
});

export const {
  getCommissionError,
  getCommissionLoading,
  getCommissionSuccess,
  updateCommissionError,
  updateCommissionLoading,
  updateCommissionSuccess,
} = commissionSlice.actions;

export default commissionSlice.reducer;

export const getCommissionApiCall = (id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;

  dispatch(
    action.apiCallBegan({
      url: `commissions/`,
      method: "get",
      params: {
        agency: id,
      },
      onStart: getCommissionLoading.type,
      onSuccess: getCommissionSuccess.type,
      onError: getCommissionError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const updateCommissionApiCall = (id, data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  const userId = getState().entities.auth.userCred.user_id;

  dispatch(
    action.apiCallBegan({
      url: `commissions/`,
      method: "post",
      data: {
        agency: id,
        admin: userId,
        ...data,
      },
      onStart: updateCommissionLoading.type,
      onSuccess: updateCommissionSuccess.type,
      onError: updateCommissionError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getCommissions = createSelector(
  (state) => {
    return state.entities.commission.commissions;
  },
  (commissions) => commissions
);

export const getAgencyCommission = createSelector(
  (state, id) => state.entities.commission.commissions[id],
  (commission) => commission
);

export const getAgenciesErrors = createSelector(
  (state) => state.entities.commission.getCommissionError,
  (getCommissionError) => getCommissionError
);

export const getAgenciesLoading = createSelector(
  (state) => state.entities.commission.isGetCommissionLoading,
  (isGetCommissionLoading) => isGetCommissionLoading
);

export const getUpdateCommissionErrors = createSelector(
  (state) => state.entities.commission.updateCommissionError,
  (updateCommissionError) => updateCommissionError
);

export const getUpdateCommissionLoading = createSelector(
  (state) => state.entities.commission.isUpdateCommissionLoading,
  (isUpdateCommissionLoading) => isUpdateCommissionLoading
);
