import "./App.css";
import Login from "./pages/Login";
import Order from "./pages/cashier/Order";
import Transctions from "./pages/cashier/Transactions";
import Admin from "./pages/Admin";
import { useSelector } from "react-redux";
import { getIsLogin, getLoggedinUser } from "./store/auth";

function App() {
  const isLogedin = useSelector((state) => getIsLogin(state));
  const loggedinUser = useSelector((state) => getLoggedinUser(state));

  return (
    <>
      {!isLogedin ? (
        <Login />
      ) : loggedinUser.user_type === "admin" ? (
        <Admin />
      ) : (
        <Transctions />
      )}
    </>
  );
}

export default App;
