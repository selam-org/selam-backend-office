import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import agency from "./agency";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import commission from "./commission";

const authPersistConfig = {
  key: "auth 1.4",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["loginError"],
};

const agencyPersistConfig = {
  key: "agency 1.4",
  version: 1.2,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "isAddAgencyLoading",
    "isAddAgencyModalOpen",
    "addAgencyError",
    "isAddAgencySuccess",
    "isGetAgenciesLoading",
    "getAgenciesError",
    "isUpdateAgencyLoading",
    "updateAgencyError",
    "isUpdateAgencyModalOpen",
  ],
};

const commissionPersistConfig = {
  key: "commission 1.9",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  agency: persistReducer(agencyPersistConfig, agency),
  commission: persistReducer(commissionPersistConfig, commission),
});
