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
  isSenderUpdateLoading: false,
  senderUpdateError: {},
  isReceiverUpdateLoading: false,
  receiverUpdateError: {},
  addReceiverError: {},
  isAddReceiverLoading: false,
  addPayment: {},
  isAddPaymentLoading: false,
  getPaymentError: {},
  getPaymentLoading: false,
  sender: null,
  receiver: null,
  paymentInfo: [],
  payment: null,
  commissions: [],
  agency: null,
  getAgencyLoading: false,
  getAgencyError: {},
  getCommissionLoading: false,
  getCommissionError: {},
  addPaymentInfoError: {},
  isAddPaymentInfoLoading: false,
  updatePaymentInfoError: {},
  updatePaymentInfoLoading: false,
  transInfo: null,
  isCalculate: true,
  rate: null,
  orderLoading: false,
  orderError: {},
  isOrderSuccess: false,
  order: null,
};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (transaction, action) => {
      transaction.transactions = [];
    },
    setIsOrderSuccess: (transaction, action) => {
      transaction.isOrderSuccess = action.payload;
    },
    postOrderLoading: (transaction, action) => {
      transaction.orderLoading = true;
    },
    postOrderError: (transaction, action) => {
      transaction.orderError = action.payload;
      transaction.orderLoading = false;
    },
    postOrderSuccess: (transaction, action) => {
      transaction.orderError = {};
      transaction.orderLoading = false;
      transaction.isOrderSuccess = true;
      transaction.order = action.payload;
    },
    setTranRate: (transaction, action) => {
      console.log(action.payload, "calculaterate");
      transaction.rate = action.payload;
    },
    setTransInfo: (transaction, action) => {
      console.log(action.payload, "calculate");
      transaction.transInfo = action.payload;
    },
    setIsCalculate: (transaction, action) => {
      transaction.isCalculate = action.payload;
    },
    getCommissionError: (transaction, action) => {
      transaction.getCommissionError = action.payload;
      transaction.getCommissionLoading = false;
    },
    getCommissionLoading: (transaction, action) => {
      transaction.getCommissionLoading = true;
    },
    getCommissionSuccess: (transaction, action) => {
      transaction.commissions = action.payload;
      transaction.getCommissionLoading = false;
      transaction.getCommissionError = {};
    },
    getAgencyError: (transaction, action) => {
      transaction.getAgencyError = action.payload;
      transaction.getAgencyLoading = false;
    },
    getAgencyLoading: (transaction, action) => {
      transaction.getAgencyLoading = true;
    },
    getAgencySuccess: (transaction, action) => {
      transaction.agency = action.payload;
      transaction.getAgencyLoading = false;
      transaction.getAgencyError = {};
    },
    updatePaymentInfoError: (transaction, action) => {
      transaction.updatePaymentInfoError = action.payload;
      transaction.updatePaymentInfoLoading = false;
    },
    updatePaymentInfoLoading: (transaction, action) => {
      transaction.updatePaymentInfoLoading = true;
    },
    updatePaymentSuccess: (transaction, action) => {
      transaction.updatePaymentInfoLoading = false;
      transaction.updatePaymentInfoError = {};
      transaction.paymentInfo = transaction.paymentInfo.map((item) => {
        if (item.id + "" === action.payload.id + "") {
          return action.payload;
        }
        return item;
      });
    },
    setPayment: (transaction, action) => {
      transaction.payment = action.payload;
    },
    getPaymentError: (transaction, action) => {
      transaction.getPaymentError = action.payload;
      transaction.getPaymentLoading = false;
    },
    getPaymentLoading: (transaction, action) => {
      transaction.getPaymentLoading = true;
    },
    getPaymentSuccess: (transaction, action) => {
      transaction.paymentInfo = action.payload;
      transaction.getPaymentLoading = false;
      transaction.getPaymentError = {};
      if (transaction.paymentInfo.length > 0) {
        transaction.payment = action.payload[0];
      }
    },
    addPaymentError: (transaction, action) => {
      transaction.addPaymentInfoError = action.payload;
      transaction.isAddPaymentInfoLoading = false;
    },
    addPaymentLoading: (transaction, action) => {
      transaction.isAddPaymentInfoLoading = true;
    },
    addPaymentSuccess: (transaction, action) => {
      transaction.isAddPaymentInfoLoading = false;
      transaction.addPaymentInfoError = {};
      const index = transaction.paymentInfo.findIndex(
        (info) => info.bank_name === action.payload.bank_name
      );

      // If an entry is found, remove it
      if (index !== -1) {
        transaction.paymentInfo.splice(index, 1);
      }
      transaction.paymentInfo.push(action.payload);
    },
    addReceiverError: (transaction, action) => {
      transaction.addReceiverError = action.payload;
      transaction.isAddReceiverLoading = false;
    },
    addReceiverLoading: (transaction, action) => {
      transaction.isAddReceiverLoading = true;
    },
    addReceiverSuccess: (transaction, action) => {
      transaction.isAddReceiverLoading = false;
      transaction.addReceiverError = {};
      transaction.payment = null;
      transaction.paymentInfo = [];
      transaction.receivers.push(action.payload);
      transaction.receiver = {
        ...action.payload,
        title: `67894-${action.payload.receiver_first_name} ${action.payload.receiver_last_name}`,
        key: action.payload.id,
        value: action.payload.id,
      };
    },
    updateReceiverError: (transaction, action) => {
      transaction.receiverUpdateError = action.payload;
      transaction.isReceiverUpdateLoading = false;
    },
    updateReceiverLoading: (transaction, action) => {
      transaction.isReceiverUpdateLoading = true;
    },
    updateReceiverSuccess: (transaction, action) => {
      console.log(action.payload, "update");
      transaction.isReceiverUpdateLoading = false;
      transaction.receiverUpdateError = {};
      transaction.receivers = transaction.receivers.map((item) => {
        if (item.id === action.payload.id) {
          console.log(action.payload, "payload");
          return action.payload;
        }
        return item;
      });
    },
    updateSenderError: (transaction, action) => {
      transaction.senderUpdateError = action.payload;
      transaction.isSenderUpdateLoading = false;
    },
    updateSenderLoading: (transaction, action) => {
      transaction.isSenderUpdateLoading = true;
    },
    updateSenderSuccess: (transaction, action) => {
      console.log(action.payload, "update");
      transaction.isSenderUpdateLoading = false;
      transaction.senderUpdateError = {};
      transaction.transactions = transaction.transactions.map((item) => {
        if (item.id === action.payload.id) {
          console.log(action.payload, "payload");
          return action.payload;
        }
        return item;
      });
    },
    getReciversError: (transaction, action) => {
      // console.log("error", action.payload);
      transaction.getReciversError = action.payload;
      transaction.isGetReciversLoading = false;
    },
    getReciversLoading: (transaction, action) => {
      transaction.isGetReciversLoading = true;
    },
    getReciversSuccess: (transaction, action) => {
      transaction.receivers = action.payload;
    },
    transactionsError: (transaction, action) => {
      transaction.getTransactionsError = action.payload;
      transaction.isGetTransactionsLoading = false;
    },
    transactionLoading: (transaction, action) => {
      console.log("loading", action.payload);
      transaction.isGetTransactionsLoading = true;
    },
    transactionSuccess: (transaction, action) => {
      transaction.transactions = action.payload;
    },
    setSender: (transaction, action) => {
      transaction.sender = action.payload;
    },
    setReceiver: (transaction, action) => {
      transaction.receiver = action.payload;
    },
    setPaymentInfo: (transaction, action) => {
      transaction.paymentInfo = action.payload;
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
  updateSenderError,
  updateSenderLoading,
  updateSenderSuccess,
  receiverUpdateError,
  receiverUpdateLoading,
  receiverUpdateSuccess,
  updateReceiverLoading,
  updateReceiverSuccess,
  updateReceiverError,
  addReceiverError,
  addReceiverLoading,
  addReceiverSuccess,
  setSender,
  setPaymentInfo,
  setReceiver,
  addPaymentError,
  addPaymentLoading,
  addPaymentSuccess,
  getPaymentError,
  setTransInfo,
  getPaymentLoading,
  getPaymentSuccess,
  setPayment,
  updatePaymentInfoError,
  updatePaymentInfoLoading,
  updatePaymentSuccess,
  getAgencyError,
  getAgencyLoading,
  getAgencySuccess,
  getCommissionError,
  getCommissionLoading,
  setIsOrderSuccess,
  getCommissionSuccess,
  setIsCalculate,
  setTranRate,
  postOrderError,
  postOrderLoading,
  postOrderSuccess,
  setTransaction,
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
export const getAgencyApiCall = () => (dispatch, getState) => {
  console.log("this in get managers api call", getState().entities.auth);
  const { token, agency: id } = getState().entities.auth.userCred;
  // console.log(token);
  dispatch(
    action.apiCallBegan({
      url: `agencies/${id}/`,
      onStart: getAgencyLoading.type,
      onSuccess: getAgencySuccess.type,
      onFailed: getAgencyError.type,
      method: "get",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const getCommissionsTranApiCall = () => (dispatch, getState) => {
  console.log("this in get managers api call", getState().entities.auth);
  const { token, agency } = getState().entities.auth.userCred;

  dispatch(
    action.apiCallBegan({
      url: `commissions/`,
      onStart: getCommissionLoading.type,
      onSuccess: getCommissionSuccess.type,
      onFailed: getCommissionError.type,
      method: "get",
      params: {
        agency: agency,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const updateReceiverApiCall = (data, id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  // const userId = getState().entities.auth.userCred.user_id;
  console.log(data, "data");
  dispatch(
    action.apiCallBegan({
      url: `receivers/${id}/`,
      method: "patch",
      data,
      onStart: updateReceiverLoading.type,
      onSuccess: updateReceiverSuccess.type,
      onFailed: updateReceiverError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const addPaymentInfoApiCall = (data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  console.log(data, "data");
  dispatch(
    action.apiCallBegan({
      url: `payment_infos/`,
      method: "post",
      data,
      onStart: addPaymentLoading.type,
      onSuccess: addPaymentSuccess.type,
      onFailed: addPaymentError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const updatePaymentInfoApiCall = (data, id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  console.log(data, "data");
  dispatch(
    action.apiCallBegan({
      url: `payment_infos/${id}/`,
      method: "patch",
      data,
      onStart: updatePaymentInfoLoading.type,
      onSuccess: updatePaymentSuccess.type,
      onFailed: updatePaymentInfoError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const updateSenderApiCall = (data, id) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  console.log(data, "data");
  dispatch(
    action.apiCallBegan({
      url: `senders/${id}/`,
      method: "patch",
      data,
      onStart: updateSenderLoading.type,
      onSuccess: updateSenderSuccess.type,
      onFailed: updateSenderError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const addReceiverApiCall = (data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  // const userId = getState().entities.auth.userCred.user_id;
  console.log(data, "data");
  dispatch(
    action.apiCallBegan({
      url: `receivers/`,
      method: "post",
      data,
      onStart: addReceiverLoading.type,
      onSuccess: addReceiverSuccess.type,
      onFailed: addReceiverError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const addOrderApiCall = (data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  // const userId = getState().entities.auth.userCred.user_id;
  console.log(data, "data");
  dispatch(
    action.apiCallBegan({
      url: `orders/`,
      method: "post",
      data,
      onStart: postOrderLoading.type,
      onSuccess: postOrderSuccess.type,
      onFailed: postOrderError.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getPaymentApiCall = (params) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  // console.log(token);
  dispatch(
    action.apiCallBegan({
      url: "payment_infos/",
      onStart: getPaymentLoading.type,
      onSuccess: getPaymentSuccess.type,
      onFailed: getPaymentError.type,
      method: "get",
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};
export const getReceiverApiCall = (params) => (dispatch, getState) => {
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
          title: `67894-${element.receiver_first_name} ${element.receiver_last_name}`,
          key: element.id,
          value: element.id,
        });
      }
    });
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

export const isUpdateSenderLoading = createSelector(
  (state) => state.entities.transaction.isSenderUpdateLoading,
  (isSenderUpdateLoading) => isSenderUpdateLoading
);
export const getUpdateSenderErrors = createSelector(
  (state) => state.entities.transaction.updateSenderError,
  (updateSenderError) => updateSenderError
);
export const isUpdateReceiverLoading = createSelector(
  (state) => state.entities.transaction.isSenderUpdateLoading,
  (isSenderUpdateLoading) => isSenderUpdateLoading
);
export const getUpdateReceiverErrors = createSelector(
  (state) => state.entities.transaction.updateSenderError,
  (updateSenderError) => updateSenderError
);
export const isAddReceiverLoading = createSelector(
  (state) => state.entities.transaction.isAddReceiverLoading,
  (isAddReceiverLoading) => isAddReceiverLoading
);
export const getAddReceiverErrors = createSelector(
  (state) => state.entities.transaction.addReceiverError,
  (addReceiverError) => addReceiverError
);
export const getReceiver = createSelector(
  (state) => state.entities.transaction.receiver,
  (receiver) => receiver
);

export const isAddPaymentLoading = createSelector(
  (state) => state.entities.transaction.isAddPaymentInfoLoading,
  (isAddPaymentInfoLoading) => isAddPaymentInfoLoading
);
export const getAddPaymentErrors = createSelector(
  (state) => state.entities.transaction.addPaymentInfoError,
  (addPaymentInfoError) => addPaymentInfoError
);
export const getPaymentInfo = createSelector(
  (state) => state.entities.transaction.paymentInfo,
  (paymentInfo) => paymentInfo
);
export const getPayment = createSelector(
  (state) => state.entities.transaction.payment,
  (payment) => payment
);
export const isGetPaymentLoading = createSelector(
  (state) => state.entities.transaction.getPaymentLoading,
  (getPaymentLoading) => getPaymentLoading
);
export const getUpdatePaymentInfoLoading = createSelector(
  (state) => state.entities.transaction.updatePaymentInfoLoading,
  (updatePaymentInfoLoading) => updatePaymentInfoLoading
);
export const getUpdatePaymentInfoError = createSelector(
  (state) => state.entities.transaction.updatePaymentInfoError,
  (updatePaymentInfoError) => updatePaymentInfoError
);
export const getAgency = createSelector(
  (state) => state.entities.transaction.agency,
  (agency) => agency
);
export const getAgencyErrors = createSelector(
  (state) => state.entities.transaction.getAgencyError,
  (getAgencyError) => getAgencyError
);
export const isGetAgencyLoading = createSelector(
  (state) => state.entities.transaction.getAgencyLoading,
  (getAgencyLoading) => getAgencyLoading
);
export const getCommissions = createSelector(
  (state) => state.entities.transaction.commissions,
  (commissions) => commissions
);
export const getCommissionsErrors = createSelector(
  (state) => state.entities.transaction.getCommissionError,
  (getCommissionError) => getCommissionError
);
export const isGetCommissionsLoading = createSelector(
  (state) => state.entities.transaction.getCommissionLoading,
  (getCommissionLoading) => getCommissionLoading
);
export const getIsCalculated = createSelector(
  (state) => state.entities.transaction.isCalculate,
  (isCalculate) => isCalculate
);
export const getTranRate = createSelector(
  (state) => state.entities.transaction.rate,
  (rate) => rate
);

export const getTransInfo = createSelector(
  (state) => state.entities.transaction.transInfo,
  (transInfo) => transInfo
);
export const getOrderLoading = createSelector(
  (state) => state.entities.transaction.orderLoading,
  (orderLoading) => orderLoading
);

export const getOrderError = createSelector(
  (state) => state.entities.transaction.orderError,
  (orderError) => orderError
);

export const getIsOrderSuccess = createSelector(
  (state) => state.entities.transaction.isOrderSuccess,
  (isOrderSuccess) => isOrderSuccess
);

export const getOrder = createSelector(
  (state) => state.entities.transaction.order,
  (order) => order
);
