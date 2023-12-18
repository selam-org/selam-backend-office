import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  transactions: [],
  isGetTransactionsLoading: false,
  getTransactionsError: {},
  receivers: [],
  getReciversError: {},
  isGetReciversLoading: false,
};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    getReciversError: (transaction, action) => {
      // console.log("error", action.payload);
      transaction.getReciversError = action.payload;
      transaction.isGetReciversLoading = false;
    },
    getReciversLoading: (transaction, action) => {
      transaction.isGetReciversLoading = true;
    },
    getReciversSuccess: (transaction, action) => {
      console.log("success in reducer", action.payload);
      transaction.receivers = action.payload;
    },
    transactionsError: (transaction, action) => {
      console.log("error", action.payload);
      transaction.getTransactionsError = action.payload;
      transaction.isGetTransactionsLoading = false;
    },
    transactionLoading: (transaction, action) => {
      console.log("loading", action.payload);
      transaction.isGetTransactionsLoading = true;
    },
    transactionSuccess: (transaction, action) => {
      console.log("success", transaction.transactions);
      transaction.transactions = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(logout, () => initialState),
});

export const {
  transactionsError,
  transactionLoading,
  transactionSuccess,
  getReciversError,
  getReciversSuccess,
  getReciversLoading,
} = slice.actions;

export default slice.reducer;

export const getTransactionsApiCall = (params) => (dispatch, getState) => {
  console.log("this in get managers api call", getState().entities.auth);
  const token = getState().entities.auth.userCred.token;
  // console.log(token);
  dispatch(
    action.apiCallBegan({
      url: "senders/",
      onStart: transactionLoading.type,
      onSuccess: transactionSuccess.type,
      onFailed: transactionsError.type,
      method: "get",
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getReceiverApiCall = (params) => (dispatch, getState) => {
  console.log("success 1", params);
  const token = getState().entities.auth.userCred.token;
  // console.log(token);
  dispatch(
    action.apiCallBegan({
      url: "receivers/",
      onStart: getReciversLoading.type,
      onSuccess: getReciversSuccess.type,
      onFailed: getReciversError.type,
      method: "get",
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getTransactions = createSelector(
  (state) => state.entities.transaction.transactions,

  (transactions) => transactions
);

export const getTransactionErrors = createSelector(
  (state) => state.entities.transaction.getTransactionErrors,
  (getTransactionErrors) => getTransactionErrors
);

export const isGetTransactionsLoading = createSelector(
  (state) => state.entities.transaction.isGetTransactionsLoading,
  (isGetTransactionsLoading) => isGetTransactionsLoading
);
export const getReceivers = createSelector(
  (state, id) => {
    const st = [];

    state.entities.transaction.receivers.forEach((element, index) => {
      if (element.sender + "" === id + "") {
        st.push({
          ...element,
          title: `67894-${element.receiver_first_name} ${
            element.receiver_last_name
          }`,
          key: element.id,
          value: element.id,
        });
      }
    });
    console.log(st, "getReceivers");
    return st;
  },
  (receivers) => receivers
);

export const getReceiverErrors = createSelector(
  (state) => state.entities.transaction.getReceiverErrors,
  (getReceiverErrors) => getReceiverErrors
);

export const isGetReceiverLoading = createSelector(
  (state) => state.entities.transaction.getReciversLoading,
  (getReciversLoading) => getReciversLoading
);
export const getTransactionById = createSelector(
  (state, id) =>
    state.entities.transaction.transactions.find(
      (item) => item.id + "" === id + ""
    ),
  (transaction) => transaction
);
