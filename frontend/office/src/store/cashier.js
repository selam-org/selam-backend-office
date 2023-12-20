import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  cashiers: [],
  isGetCashiersLoading: false,
  getCashiersError: {},
  isAddCashierModalOpen: false,
  isAddCashierLoading: false,
  addCashierError: {},
  isAddCashierSuccess: false,
  isUpdateCashierLoading: false,
  updateCashierError: {},
  isUpdateCashierModalOpen: {},
  isChangePasswordLoading: false,
  changePasswordError: {},
  isChangePasswordModalOpen: {},
  isChangePasswordSuccess: false,
};

const cashierSlice = createSlice({
  name: "cashier",
  initialState,
  reducers: {
    getCashiersError: (state, action) => {
      state.getCashiersError = action.payload;
    },
    getCashiersLoading: (state, action) => {
      state.isGetCashiersLoading = true;
    },
    getCashiersSuccess: (state, action) => {
      state.cashiers = action.payload;
      state.isGetCashiersLoading = false;
    },
    addCashier: (state, action) => {
      const new_cashier = action.payload;
      state.cashiers.push(new_cashier);
      state.addCashierError = {};
      state.isAddCashierLoading = false;
      state.isAddCashierModalOpen = false;
      state.isAddCashierSuccess = true;
    },
    addCashierLoading: (state, action) => {
      state.isAddCashierLoading = true;
      state.isAddCashierSuccess = false;
    },
    addCashierError: (state, action) => {
      state.addCashierError = action.payload;
      state.isAddCashierLoading = false;
      state.isAddCashierSuccess = false;
    },
    updateCashier: (state, action) => {
      const { id } = action.payload;
      const index = state.cashiers.findIndex((updated_cashier) => {
        return updated_cashier.id === action.payload.id;
      });

      state.cashiers[index] = action.payload;
      state.updateCashierError = {};
      state.isUpdateCashierLoading = false;
      state.isUpdateCashierModalOpen[id] = false;
      console.log(state.isUpdateCashierModalOpen[id]);
    },
    updateCashierLoading: (state, action) => {
      state.isUpdateCashierLoading = true;
    },
    updateCashierError: (state, action) => {
      state.updateCashierError = action.payload;
      state.isUpdateCashierLoading = false;
    },
    changePassword: (state, action) => {
      const { id } = action.payload;
      const index = state.cashiers.findIndex((updated_cashier) => {
        return updated_cashier.id === action.payload.id;
      });

      state.cashiers[index] = action.payload;
      state.changePasswordError = {};
      state.isChangePasswordLoading = false;
      state.isChangePasswordModalOpen[id] = false;
      state.isChangePasswordSuccess = true;
    },
    changePasswordLoading: (state, action) => {
      state.isChangePasswordLoading = true;
    },
    changePasswordError: (state, action) => {
      state.changePasswordError = action.payload;
      state.isChangePasswordLoading = false;
      state.isChangePasswordSuccess = false;
    },
    setIsAddCashierModalOpen: (state, action) => {
      state.isAddCashierModalOpen = action.payload.open;
    },
    setIsAddCashierSuccess: (state, action) => {
      state.isAddCashierSuccess = action.payload.open;
    },
    setIsUpdateCashierModal: (state, action) => {
      state.isUpdateCashierModalOpen[action.payload.id] = action.payload.open;
    },
    setIsChangePasswordModal: (state, action) => {
      state.isChangePasswordModalOpen[action.payload.id] = action.payload.open;
    },
    extraReducers: (builder) => builder.addCase(logout, () => initialState),
  },
});

export const {
  getCashiersError,
  getCashiersLoading,
  getCashiersSuccess,
  addCashier,
  addCashierLoading,
  addCashierError,
  setIsAddCashierModalOpen,
  setIsAddCashierSuccess,
  updateCashier,
  updateCashierLoading,
  updateCashierError,
  setIsUpdateCashierModal,
  changePassword,
  changePasswordLoading,
  changePasswordError,
  setIsChangePasswordModal,
} = cashierSlice.actions;

export default cashierSlice.reducer;

export const getCashiersApiCall = (id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;

  dispatch(
    action.apiCallBegan({
      url: `cashiers/`,
      method: "get",
      onStart: getCashiersLoading.type,
      onSuccess: getCashiersSuccess.type,
      onFailed: getCashiersError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const addCashierApiCall = (data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  data = { ...data, username: data.email };
  dispatch(
    action.apiCallBegan({
      url: `cashiers/`,
      method: "post",
      data,
      onStart: addCashierLoading.type,
      onSuccess: addCashier.type,
      onFailed: addCashierError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const updateCashierApiCall = (id, data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  console.log(token, "token", id, data);
  dispatch(
    action.apiCallBegan({
      url: `cashiers/${id}/`,
      method: "patch",
      data,
      onStart: updateCashierLoading.type,
      onSuccess: updateCashier.type,
      onFailed: updateCashierError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const changePasswordApiCall =
  (id, newPassword) => (dispatch, getState) => {
    const token = getState().entities.auth.userCred.token;
    dispatch(
      action.apiCallBegan({
        url: `cashiers/${id}/`,
        method: "patch",
        data: {
          password: newPassword,
        },
        onStart: changePasswordLoading.type,
        onSuccess: changePassword.type,
        onFailed: changePasswordError.type,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    );
  };

export const getCashiers = createSelector(
  (state) => {
    return state.entities.cashier.cashiers;
  },
  (cashiers) => cashiers
);

export const getCashier = createSelector(
  (state, id) => {
    return state.entities.cashier.cashiers.find(
      (cashier) => `${cashier.id}` === `${id}`
    );
  },
  (cashiers) => cashiers
);

export const getCashiersErrors = createSelector(
  (state) => state.entities.cashier.getCashiersError,
  (getCashiersError) => getCashiersError
);

export const isGetCashiersLoading = createSelector(
  (state) => state.entities.cashier.isGetCashiersLoading,
  (isGetCashiersLoading) => isGetCashiersLoading
);

export const isAddCashierModalOpen = createSelector(
  (state) => state.entities.cashier.isAddCashierModalOpen,
  (isAddCashierModalOpen) => isAddCashierModalOpen
);

export const isAddCashierLoading = createSelector(
  (state) => state.entities.cashier.isAddCashierLoading,
  (isAddCashierLoading) => isAddCashierLoading
);

export const isAddCashierSuccess = createSelector(
  (state) => state.entities.cashier.isAddCashierSuccess,
  (isAddCashierSuccess) => isAddCashierSuccess
);

export const getAddCashierErrors = createSelector(
  (state) => state.entities.cashier.addCashierError,
  (addCashierError) => addCashierError
);

export const isUpdateCashierModalOpen = createSelector(
  (state) => state.entities.cashier.isUpdateCashierModalOpen,
  (isUpdateCashierModalOpen) => isUpdateCashierModalOpen
);

export const isUpdateCashierLoading = createSelector(
  (state) => state.entities.cashier.isUpdateCashierLoading,
  (isUpdateCashierLoading) => isUpdateCashierLoading
);

export const getUpdateCashierErrors = createSelector(
  (state) => state.entities.cashier.updateCashierError,
  (updateCashierError) => updateCashierError
);

export const isChangePasswordModalOpen = createSelector(
  (state) => state.entities.cashier.isChangePasswordModalOpen,
  (isChangePasswordModalOpen) => isChangePasswordModalOpen
);

export const isChangePasswordLoading = createSelector(
  (state) => state.entities.cashier.isChangePasswordLoading,
  (isChangePasswordLoading) => isChangePasswordLoading
);

export const getChangePasswordErrors = createSelector(
  (state) => state.entities.cashier.changePasswordError,
  (changePasswordError) => changePasswordError
);

export const getChangePasswordSuccess = createSelector(
  (state) => state.entities.cashier.isChangePasswordSuccess,
  (isChangePasswordSuccess) => isChangePasswordSuccess
);
