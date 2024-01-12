import React from "react";
import { Route, Routes } from "react-router-dom";
import Transctions from "./cashier/Transactions";
import Order from "./cashier/Order";
import Reports from "./cashier/Reports";
import ReportsOutput from "./cashier/ReportsOutput";
import UserReport from "./cashier/UserReport";

function Cashier() {
  return (
    <Routes>
      <Route path="/" element={<Transctions />} />
      <Route path="/orders/:senderId" element={<Order />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/reports/output" element={<ReportsOutput />} />
      <Route path="/reports/user-report" element={<UserReport />} />
    </Routes>
  );
}

export default Cashier;
