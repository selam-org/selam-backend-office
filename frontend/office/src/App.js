import "./App.css";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Cashier from "./pages/Cashier";
import { useSelector } from "react-redux";
import { getIsLogin, getLoggedinUser } from "./store/auth";
import UserReportLayoutOne from "./components/cashier/reports/UserReportLayoutOne";

function App() {
  const isLogedin = useSelector((state) => getIsLogin(state));
  const loggedinUser = useSelector((state) => getLoggedinUser(state));

  return (
    <>
      {/* <UserReportLayoutOne /> */}
      {!isLogedin ? (
        <Login />
      ) : loggedinUser.user_type === "admin" ? (
        <Admin />
        // <Cashier />
      ) : (
        <Cashier />
      )}
    </>
  );
}

export default App;
