import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  agencies: [],
  isAddAgencyModalOpen: false,
  isAddAgencyLoading: false,
  addAgencyError: {},
  isAddAgencySuccess: false,
  isGetAgenciesLoading: false,
  getAgenciesError: {},
  isUpdateAgencyLoading: false,
  updateAgencyError: {},
  isUpdateAgencyModalOpen: {},
  isUpdateRateLoading: false,
  updateRateError: {},
  showRateUpdatedSuccess: false,
};

const slice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    agencysError: (agency, action) => {
      console.log("error", action.payload);
      agency.getAgenciesError = action.payload;
      agency.isGetAgenciesLoading = false;
    },
    agencyLoading: (agency, action) => {
      console.log("loading", action.payload);
      agency.isGetAgenciesLoading = true;
    },
    agencySuccess: (agency, action) => {
      agency.agencies = action.payload;
    },
    addAgency: (agency, action) => {
      const new_agency = action.payload;
      agency.agencies.push(new_agency);
      agency.addAgencyError = {};
      agency.isAddAgencyLoading = false;
      agency.isAddAgencyModalOpen = false;
      agency.isAddAgencySuccess = true;
    },
    addAgencyLoading: (agency, action) => {
      agency.isAddAgencyLoading = true;
      agency.isAddAgencySuccess = false;
    },
    addAgencyError: (agency, action) => {
      console.log(action.payload, "add agency error");
      agency.addAgencyError = action.payload;
      agency.isAddAgencyLoading = false;
      agency.isAddAgencySuccess = false;
    },
    setIsAddAgencyModalOpen: (agency, action) => {
      agency.isAddAgencyModalOpen = action.payload.open;
    },
    setIsAddAgencySuccess: (agency, action) => {
      agency.isAddAgencySuccess = action.payload.open;
    },
    clearAddAgencyError: (agency, action) => {
      agency.addAgencyError = {};
    },
    updateAgency: (agency, action) => {
      console.log(action.payload.id, agency.agencies);
      console.log(action.payload, "update agency in slice");
      console.log(agency.agencies, "original data");

      const { id } = action.payload;
      const index = agency.agencies.findIndex((updated_agency) => {
        console.log(updated_agency.id, action.payload.id, "agency id");
        return updated_agency.id === action.payload.id;
      });

      agency.agencies[index] = action.payload;
      agency.updateAgencyError = {};
      agency.isUpdateAgencyLoading = false;
      agency.isUpdateAgencyModalOpen[id] = false;
      console.log(agency.isUpdateAgencyModalOpen[id]);
    },
    updateAgencyLoading: (agency, action) => {
      agency.isUpdateAgencyLoading = true;
    },
    updateAgencyError: (agency, action) => {
      agency.updateAgencyError = action.payload;
      agency.isUpdateAgencyLoading = false;
    },
    updateAgencyRate: (agency, action) => {
      const index = agency.agencies.findIndex((updated_agency) => {
        return updated_agency.agency_id === action.payload.agency_id;
      });

      agency.agencies[index] = action.payload;
      agency.updateRateError = {};
      agency.isUpdateRateLoading = false;
      agency.showRateUpdatedSuccess = true;
    },
    updateAgencyRateLoading: (agency, action) => {
      agency.isUpdateRateLoading = true;
    },
    updateAgencyRateError: (agency, action) => {
      agency.updateRateError = action.payload;
      agency.isUpdateRateLoading = false;
      agency.showRateUpdatedSuccess = false;
    },
    clearUpdateRateError: (agency, action) => {
      agency.updateRateError = {};
    },
    setShowRateUpdatedSuccess: (agency, action) => {
      agency.showRateUpdatedSuccess = action.payload;
    },
    setIsUpdateAgencyModal: (agency, action) => {
      agency.isUpdateAgencyModalOpen[action.payload.id] = action.payload.open;
    },
  },
  extraReducers: (builder) => builder.addCase(logout, () => initialState),
});

export const {
  updateAgencyLoading,
  updateAgencyError,
  updateAgency,
  deleteAgency,
  deleteAgencyError,
  deleteAgencyLoading,
  setIsAddAgencyModalOpen,
  setIsAddAgencySuccess,
  agencysError,
  agencyLoading,
  agencySuccess,
  clearAddAgencyError,
  addAgency,
  addAgencyLoading,
  addAgencyError,
  updateAgencyRate,
  updateAgencyRateLoading,
  updateAgencyRateError,
  clearUpdateRateError,
  setShowRateUpdatedSuccess,
  setIsUpdateAgencyModal,
} = slice.actions;

export default slice.reducer;

export const getAgenciesApiCall = () => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  dispatch(
    action.apiCallBegan({
      url: "agencies/",
      onStart: agencyLoading.type,
      onSuccess: agencySuccess.type,
      onFailed: agencysError.type,
      method: "get",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const updateAgencyApiCall = (data, id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  dispatch(
    action.apiCallBegan({
      url: `agencies/${id}/`,
      onStart: updateAgencyLoading.type,
      onSuccess: updateAgency.type,
      onFailed: updateAgencyError.type,
      method: "patch",
      data,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const updateAgencyRateApiCall = (data, id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  dispatch(
    action.apiCallBegan({
      url: `agencies/${id}/`,
      onStart: updateAgencyRateLoading.type,
      onSuccess: updateAgencyRate.type,
      onFailed: updateAgencyRateError.type,
      method: "patch",
      data,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const addAgencyApiCall = (data) => (dispatch, getState) => {
  const { token, id } = getState().entities.auth.userCred;

  dispatch(
    action.apiCallBegan({
      url: "agencies/",
      onStart: addAgencyLoading.type,
      onSuccess: addAgency.type,
      onFailed: addAgencyError.type,
      method: "post",
      data: data,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getAgencies = createSelector(
  (state) => state.entities.agency.agencies,
  (agencies) => {
    const sortedAgencies = agencies ? [...agencies] : [];
    sortedAgencies.sort((a, b) => a.name.localeCompare(b.name));
    return sortedAgencies;
  }
);

export const getAgency = createSelector(
  (state, id) =>
    state.entities.agency.agencies.find((agency) => agency.id + "" === id + ""),
  (agency) => agency
);

export const getAddAgencyErrors = createSelector(
  (state) => state.entities.agency.addAgencyError,
  (addAgencyError) => addAgencyError
);
export const getDeleteAgencyError = createSelector(
  (state) => state.entities.agency.deleteAgencyError,
  (deleteAgencyError) => deleteAgencyError
);
export const getUpdateAgencyErrors = createSelector(
  (state) => state.entities.agency.updateAgencyError,
  (updateAgencyError) => updateAgencyError
);

export const isAddAgencyLoading = createSelector(
  (state) => state.entities.agency.isAddAgencyLoading,
  (isAddAgencyLoading) => isAddAgencyLoading
);

export const isAddAgencySuccess = createSelector(
  (state) => state.entities.agency.isAddAgencySuccess,
  (isAddAgencySuccess) => isAddAgencySuccess
);

export const isGetAgenciesLoading = createSelector(
  (state) => state.entities.agency.isGetAgenciesLoading,
  (isGetAgenciesLoading) => isGetAgenciesLoading
);

export const isAddAgencyModalOpen = createSelector(
  (state) => state.entities.agency.isAddAgencyModalOpen,
  (isAddAgencyModalOpen) => isAddAgencyModalOpen
);
export const isDeleteAgencyLoading = createSelector(
  (state) => state.entities.agency.isDeleteAgencyLoading,
  (isDeleteAgencyLoading) => isDeleteAgencyLoading
);

export const isUpdateAgencyLoading = createSelector(
  (state) => state.entities.agency.isUpdateAgencyLoading,
  (isUpdateAgencyLoading) => isUpdateAgencyLoading
);

export const isUpdateAgencyModalOpen = createSelector(
  (state) => state.entities.agency.isUpdateAgencyModalOpen,
  (isUpdateAgencyModalOpen) => isUpdateAgencyModalOpen
);

export const isUpdateRateLoading = createSelector(
  (state) => state.entities.agency.isUpdateRateLoading,
  (isUpdateRateLoading) => isUpdateRateLoading
);

export const getShowRateUpdatedSuccess = createSelector(
  (state) => state.entities.agency.showRateUpdatedSuccess,
  (showRateUpdatedSuccess) => showRateUpdatedSuccess
);

export const getUpdateRateError = createSelector(
  (state) => state.entities.agency.updateRateError,
  (updateRateError) => updateRateError
);
