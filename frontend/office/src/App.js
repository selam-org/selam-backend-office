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
      <Route path="/cashier" element={<Transctions />} />
      <Route path="/cashier/order" element={<Order />} />
    </Routes>
  );
}

export default App;
