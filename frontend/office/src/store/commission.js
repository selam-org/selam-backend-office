import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  commissions: {},
  isGetCommissionLoading: false,
  getCommissionError: {},
  isAddCommissionLoading: false,
  addCommissionError: {},
  isAddCommissionSuccess: false,
  isUpdateCommissionLoading: false,
  isUpdateCommissionSuccess: false,
  updateCommissionError: {},
  isDeleteComissionLoading: false,
  deleteCommissionError: {},
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
      const { agency } = action.params;
      const commissions = action.payload;
      console.log("agency", agency);
      console.log("commissions", commissions);
      state.commissions[agency] = commissions;
      state.isGetCommissionLoading = false;
    },
    addCommissionError: (state, action) => {
      state.addCommissionError = action.payload;
      state.isAddCommissionSuccess = false;
    },
    addCommissionLoading: (state, action) => {
      state.isAddCommissionLoading = true;
    },
    addCommissionSuccess: (state, action) => {
      const commission = action.payload;
      if (!state.commissions[commission.agency])
        state.commissions[commission.agency] = [];
      state.commissions[commission.agency].push(commission);
      state.isAddCommissionLoading = false;
      state.isAddCommissionSuccess = true;
    },
    updateCommissionError: (state, action) => {
      state.updateCommissionError = action.payload;
    },
    updateCommissionLoading: (state, action) => {
      state.isUpdateCommissionLoading = true;
    },
    updateCommissionSuccess: (state, action) => {
      const { agency, id } = action.payload;
      state.commissions[agency] = state.commissions[agency].map(
        (commission) => {
          if (commission.id === id) {
            return { ...action.payload };
          }
          return commission;
        }
      );
      state.isUpdateCommissionLoading = false;
      state.isUpdateCommissionSuccess = true;
    },
    deleteCommissionError: (state, action) => {
      state.deleteCommissionError = action.payload;
      state.isUpdateCommissionSuccess = false;
    },
    deleteCommissionLoading: (state, action) => {
      state.isDeleteComissionLoading = true;
    },
    deleteCommissionSuccess: (state, action) => {
      const { agency, id } = action.payload;
      state.commissions[agency] = state.commissions[agency].filter(
        (commission) => commission.id !== id
      );
      state.isDeleteComissionLoading = false;
    },
    setIsAddCommissionSuccess: (agency, action) => {
      agency.isAddCommissionSuccess = action.payload;
    },
    setIsUpdateCommissionSuccess: (agency, action) => {
      agency.isUpdateCommissionSuccess = action.payload;
    },
    extraReducers: (builder) => builder.addCase(logout, () => initialState),
  },
});

export const {
  getCommissionError,
  getCommissionLoading,
  getCommissionSuccess,
  addCommissionError,
  addCommissionLoading,
  addCommissionSuccess,
  updateCommissionError,
  updateCommissionLoading,
  updateCommissionSuccess,
  deleteCommissionError,
  deleteCommissionLoading,
  deleteCommissionSuccess,
  setIsAddCommissionSuccess,
  setIsUpdateCommissionSuccess,
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
      onFailed: getCommissionError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const addCommissionApiCall = (agency, data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  const userId = getState().entities.auth.userCred.user_id;

  dispatch(
    action.apiCallBegan({
      url: `commissions/`,
      method: "post",
      data: {
        admin: userId,
        agency,
        // TODO: Remove start of commission.
        start: 0,
        ...data,
      },
      onStart: addCommissionLoading.type,
      onSuccess: addCommissionSuccess.type,
      onFailed: addCommissionError.type,
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
      url: `commissions/${id}/`,
      method: "patch",
      data: {
        agency: id,
        admin: userId,
        ...data,
      },
      onStart: updateCommissionLoading.type,
      onSuccess: updateCommissionSuccess.type,
      onFailed: updateCommissionError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const deleteCommissionApiCall = (id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;

  dispatch(
    action.apiCallBegan({
      url: `commissions/${id}/`,
      method: "delete",
      onStart: deleteCommissionLoading.type,
      onSuccess: deleteCommissionSuccess.type,
      onFailed: deleteCommissionError.type,
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
  (commission) => {
    let sortedCommission = commission !== undefined ? [...commission] : [];
    sortedCommission.sort((a, b) => a.end - b.end);
    return sortedCommission;
  }
);

export const getAgenciesErrors = createSelector(
  (state) => state.entities.commission.getCommissionError,
  (getCommissionError) => getCommissionError
);

export const getAgenciesLoading = createSelector(
  (state) => state.entities.commission.isGetCommissionLoading,
  (isGetCommissionLoading) => isGetCommissionLoading
);

export const getAddCommissionErrors = createSelector(
  (state) => state.entities.commission.addCommissionError,
  (addCommissionError) => addCommissionError
);

export const isAddCommissionLoading = createSelector(
  (state) => state.entities.commission.isAddCommissionLoading,
  (isAddCommissionLoading) => isAddCommissionLoading
);

export const isAddCommissionSuccess = createSelector(
  (state) => state.entities.commission.isAddCommissionSuccess,
  (isAddCommissionSuccess) => isAddCommissionSuccess
);

export const isUpdateCommissionErrors = createSelector(
  (state) => state.entities.commission.updateCommissionError,
  (updateCommissionError) => updateCommissionError
);

export const isUpdateCommissionLoading = createSelector(
  (state) => state.entities.commission.isUpdateCommissionLoading,
  (isUpdateCommissionLoading) => isUpdateCommissionLoading
);

export const isUpdateCommissionSuccess = createSelector(
  (state) => state.entities.commission.isUpdateCommissionSuccess,
  (isUpdateCommissionSuccess) => isUpdateCommissionSuccess
);
