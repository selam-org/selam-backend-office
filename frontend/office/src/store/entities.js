import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import agency from "./agency";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import transactions from "./transactions";
import commission from "./commission";
import cashier from "./cashier";

const authPersistConfig = {
  key: "auth 1.8",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["loginError"],
};
const transactionPersistConfig = {
  key: "transaction 1.1",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["isGetTransactionsLoading", "getTransactionsError", "receivers"],
};

const agencyPersistConfig = {
  key: "agency 1.5",
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
  key: "commission 1.0",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["commissions"],
};

const cashierPersistConfig = {
  key: "cashier 1.8",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "isGetCashiersLoading",
    "getCashiersError",
    "isAddCashierModalOpen",
    "isAddCashierLoading",
    "addCashierError",
    "isAddCashierSuccess",
    "isUpdateCashierLoading",
    "updateCashierError",
    "isUpdateCashierModalOpen",
    "isChangePasswordLoading",
    "isChangePasswordModalOpen",
    "changePasswordError",
    "isChangePasswordSuccess",
  ],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  agency: persistReducer(agencyPersistConfig, agency),
  cashier: persistReducer(cashierPersistConfig, cashier),
  commission: persistReducer(commissionPersistConfig, commission),
  transaction: persistReducer(transactionPersistConfig, transactions),
});
