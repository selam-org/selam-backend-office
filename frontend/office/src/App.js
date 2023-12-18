import "./App.css";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { useSelector } from "react-redux";
import { getIsLogin, getLoggedinUser } from "./store/auth";
import Cashier from "./pages/Cashier";
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
        <Cashier />
      )}
    </>
  );
}

export default App;
