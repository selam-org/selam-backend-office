import React from "react";
import { Route, Routes } from "react-router-dom";
import Transctions from "./cashier/Transactions";
import Order from "./cashier/Order";
import Receipt from "../components/cashier/order/Receipt";

function Cashier(props) {
  return (
    <Routes>
      <Route path="/" element={<Transctions />} />
      <Route path="/orders/:senderId" element={<Order />} />
      <Route path="/report" element={<h1>Reports</h1>} />
      <Route path="/receipt" element={<Receipt />} />
    </Routes>
  );
}

export default Cashier;
