import { createSlice, createSelector } from "@reduxjs/toolkit";
import * as action from "./api";
import { logout } from "./middleware/auth";

const initialState = {
  order: [],
  isUploadingOrder: false,
  uploadOrderError: {},
  filters: [],
  isUploadingOrder: false,
  uploadError: {},
  summary: null,
  getSummaryLoading: false,
  getSummaryError: {},
  excelOrders: [],
  getExcelOrdersLoading: false,
  getExcelOrdersError: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getExcelOrdersError: (state, action) => {
      state.excelOrders = [];
      state.getExcelOrdersLoading = false;
      state.getExcelOrdersError = action.payload;
    },
    getExcelOrdersLoading: (state, action) => {
      state.excelOrders = [];
      state.getExcelOrdersLoading = true;
      state.getExcelOrdersError = {};
    },
    getExcelOrdersSuccess: (state, action) => {
      state.excelOrders = action.payload;
      state.getExcelOrdersLoading = false;
      state.getExcelOrdersError = {};
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    getSummarySuccess: (state, action) => {
      state.summary = action.payload;
      state.getSummaryLoading = false;
      state.getSummaryError = {};
    },
    getSummaryFailed: (state, action) => {
      state.summary = null;
      state.getSummaryLoading = false;
      state.getSummaryError = action.payload;
    },
    getSummaryLoading: (state, action) => {
      state.getSummaryLoading = true;
      state.getSummaryError = {};
    },
    setOrders: (state, action) => {
      console.log("hi");
      state.order = action.payload;
      console.log(action.payload, "action");
      const filters = [];
      const orders = [];
      action.payload.forEach((order, index) => {
        filters.push({
          text: order["Sender Phone"],
          value: order["Sender Phone"],
        });
        orders.push({
          ...order,
          key: index,
        });
        order["key"] = index;
      });
      state.filters = filters;
      state.order = orders;
    },
    // setFilters: (state, action) => {
    //   state.filters = action.payload;
    // },
    updateOrder: (state, action) => {
      console.log(action.payload, "payload");
      const order = state.order[action.payload.index];
      console.log(state.order[action.payload.index], "order1");
      state.order[action.payload.index] = {
        ...order,
        ...action.payload.row,
      };
    },

    uploadOrdersSuccess: (state, action) => {
      state.isUploadingOrder = false;
      state.uploadOrderError = {};
    },
    uploadOrdersFailed: (state, action) => {
      state.isUploadingOrder = false;
      state.uploadOrderError = action.payload;
      console.log(action.payload, "error");
    },
    uploadOrdersLoading: (state, action) => {
      state.isUploadingOrder = true;
      state.uploadOrderError = {};
    },

    extraReducers: (builder) => builder.addCase(logout, () => initialState),
  },
});
export const {
  getExcelOrdersError,
  getExcelOrdersLoading,
  getExcelOrdersSuccess,
  setOrders,
  updateOrder,
  uploadOrdersFailed,
  uploadOrdersLoading,
  uploadOrdersSuccess,
  getSummaryFailed,
  getSummaryLoading,
  getSummarySuccess,
  setSummary,
} = orderSlice.actions;

export default orderSlice.reducer;

export const uploadOrderApi = (data) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  // data = { ...data, username: data.email };
  dispatch(
    action.apiCallBegan({
      url: `orders/create_list/`,
      method: "post",
      data,
      onStart: uploadOrdersLoading.type,
      onSuccess: uploadOrdersSuccess.type,
      onFailed: uploadOrdersFailed.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getSummaryApi = (params) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  // data = { ...data, username: data.email };
  dispatch(
    action.apiCallBegan({
      url: `orders/summary/`,
      method: "get",
      params,
      onStart: getSummaryLoading.type,
      onSuccess: getSummarySuccess.type,
      onFailed: getSummaryFailed.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getExcelOrderApi = (params) => (dispatch, getState) => {
  const token = getState().entities.auth.userCred.token;
  // data = { ...data, username: data.email };
  dispatch(
    action.apiCallBegan({
      url: `orders/`,
      method: "get",
      params,
      onStart: getExcelOrdersLoading.type,
      onSuccess: getExcelOrdersSuccess.type,
      onFailed: getExcelOrdersLoading.type,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  );
};

export const getOrder = createSelector(
  (state) => state.entities.order.order,
  (order) => order
);
export const getSummary = createSelector(
  (state) => state.entities.order.summary,
  (summary) => summary
);
export const isSummaryLoading = createSelector(
  (state) => state.entities.order.getSummaryLoading,
  (getSummaryLoading) => getSummaryLoading
);
export const getSummaryError = createSelector(
  (state) => state.entities.order.getSummaryError,
  (getSummaryError) => getSummaryError
);
export const getFilters = createSelector(
  (state) => state.entities.order.filters,
  (filters) => filters
);

export const getUploadOrderError = createSelector(
  (state) => state.entities.order.uploadError,
  (uploadError) => uploadError
);

export const getIsUploadingOrder = createSelector(
  (state) => state.entities.order.isUploadingOrder,
  (isUploadingOrder) => isUploadingOrder
);

export const getExcelOrder = createSelector(
  (state) => state.entities.order.excelOrders,
  (excelOrders) => excelOrders
);

export const isExcelOrderLoading = createSelector(
  (state) => state.entities.order.getExcelOrdersLoading,
  (getExcelOrdersLoading) => getExcelOrdersLoading
);

export const getExcelOrderError = createSelector(
  (state) => state.entities.order.getExcelOrdersError,
  (getExcelOrdersError) => getExcelOrdersError
);







const transactionData = {
  Invoice: 'SE001-52375',
  'Confirmation No': '809816729165',
  Agency: 'SE001',
  Date: '11/7/2022 6:40:50 PM',
  'Send Currency': 'Dollar',
  'Received Currency': 'Ethiopian Birr',
  'Rate Change Receiver': 98,
  'Net Amount Receiver': 19512.2,
  Fee: 487.8,
  Total: 20000,
  'Payment Type': 'Check',
  'Total Pay Receiver': 1912195.12,
  Sender: 'ROBEL  GEBRETSADIK',
  'Sender Phone': '2024467584',
  'Sender Address': '5435 STANTON AVE',
  'Sender City': 'PITTSBURGH, Pennsylvania-15206',
  'Sender State': 'Pennsylvania',
  'Sender Zip': '15206',
  'Birthday Sender': '27/05/1983',
  'Sender SSN': '813-20-7958',
  'Name Type Id Sender': 'Driver License',
  'Number Id Sender': '32277665',
  'Sender State Identification': 'Pennsylvania',
  'Sender Country Identification': 'United States',
  Receiver: 'SMAWAY  HAILU',
  'Receiver Phone': '09',
  'Receiver Address': '',
  'Receiver City': 'ADDIS ABABA GPO',
  'Receiver State': 'Ethiopia',
  'Receiver Country': 'Ethiopia',
  Status: 'HOLD',
  'Payee Reference': 'SE001-52375',
  'Employee Code': 'Marefat',
  'Payee Agency': 'Pa001 ehtiopia payee partner',
  'Point of Payment': 'ehtiopia payee partner',
  'Mode Pay Receiver': 'BANK DEPOSIT',
  Bank: 'Commercial Bank of Ethiopia',
  'Bank Account': '1000235723089',
  'Id Sender': 235666,
  'Notes Receiver': '',
  Company: 'Selam Express',
  'ID Branch': 'SE001',
  'Name Agency': 'Agency Saleemexpress, United States',
  'Address Agency': '8205 fenton street',
  'City Agency': 'SILVER SPRING,Maryland-20910',
  'State Agency': 'Maryland',
  Zip_Agency: '20910',
  'Id Country Transmitter': 'United States',
  'Id Country National': 'United States',
  'Sender Sex': 'M',
  Citizenship: 'United States',
  'Send Date': '11/7/2022 11:40:50 PM',
  Assign: 'Hold',
  Speed: 'Regular'
};









