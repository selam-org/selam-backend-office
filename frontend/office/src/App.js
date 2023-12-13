import "./App.css";
import Login from "./pages/Login";
import Order from "./pages/cashier/Order";
import Transctions from "./pages/cashier/Transactions";
import Admin from "./pages/Admin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/client" element={<Transctions />} />
      <Route path="/client/order" element={<Order />} />
    </Routes>
  );
}

export default App;
