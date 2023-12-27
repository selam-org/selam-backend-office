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
  key: "auth 2.5",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["userCred", "logedIn"],
};

const transactionPersistConfig = {
  key: "transaction 1.2",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["transactions"],
};

const agencyPersistConfig = {
  key: "agency 2.1",
  version: 1.3,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["agencies"],
};

const commissionPersistConfig = {
  key: "commission 1.1",
  version: 1.0,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["commissions"],
};

const cashierPersistConfig = {
  key: "cashier 1.9",
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
