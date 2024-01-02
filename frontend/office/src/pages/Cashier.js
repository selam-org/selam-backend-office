import React from "react";
import { Route, Routes } from "react-router-dom";
import Transctions from "./cashier/Transactions";
import Order from "./cashier/Order";
import Reports from "./cashier/Reports";

function Cashier(props) {
  return (
    <Routes>
      <Route path="/" element={<Transctions />} />
      <Route path="/orders/:senderId" element={<Order />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default Cashier;
