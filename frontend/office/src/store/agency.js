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
    updateAgency: (agency, action) => {
      console.log(action.payload.agency_id, agency.agencies);
      console.log(action.payload, "update agency in slice");
      const index = agency.agencies.findIndex((bnk) => {
        console.log(bnk.agency_id, action.payload.agency_id, "agency id");
        return bnk.agency_id === action.payload.agency_id;
      });
      agency.agencies[index] = action.payload;
      agency.updateAgencyError = {};
      agency.isUpdateAgencyLoading = false;
      agency.isUpdateAgencyModalOpen[agency.agencies[index].agency_id] = false;
    },
    updateAgencyLoading: (agency, action) => {
      agency.isUpdateAgencyLoading = true;
    },
    updateAgencyError: (agency, action) => {
      agency.updateAgencyError = action.payload;
      agency.isUpdateAgencyLoading = false;
    },
    setIsUpdateAgencyModal: (agency, action) => {
      agency.isUpdateAgencyModalOpen[action.payload.id] = action.payload.open;
    },
  },
  extraReducers: (builder) => builder.addCase(logout, () => initialState),
});

export const {
  setIsUpdateAgencyModal,
  updateAgencyLoading,
  updateAgencyError,
  updateAgency,
  deleteAgency,
  deleteAgencyError,
  deleteAgencyLoading,
  setIsAddAgencyModalOpen,
  agencysError,
  agencyLoading,
  agencySuccess,
  addAgency,
  addAgencyLoading,
  addAgencyError,
} = slice.actions;

export default slice.reducer;

export const getAgenciesApiCall = () => (dispatch, getState) => {
  console.log("this in get managers api call", getState().entities.auth);
  const token = getState().entities.auth.userCred.token;
  // console.log(token);
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
export const updateAgencyApiCAll = (data, id) => (dispatch, getState) => {
  console.log("this in get managers api call", getState().entities.auth);
  const token = getState().entities.auth.userCred.token;
  // console.log(token);
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

export const addAgencyApiCall = (data) => (dispatch, getState) => {
  console.log("this in get managers api call", getState().entities.auth);
  const { token, id } = getState().entities.auth.userCred;
  console.log(token, id, "addAgency");

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

  (agencies) => agencies
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

export const getAgenciesUploadSingleOrder = createSelector(
  (state) => {
    const agencies = state.entities.agency.agencies;
    const arr = [];
    agencies.forEach((element) => {
      arr.push({
        ...element,
        value: element.agency_name,
        label: element.agency_name,
      });
    });
    return arr;
  },
  (agencies) => agencies
);
