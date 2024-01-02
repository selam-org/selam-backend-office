import NewTransactionForm from "../../components/cashier/transactions/NewTransactionForm";
import TransactionResult from "../../components/cashier/transactions/TransactionResults";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NavBar from "../../components/cashier/NavBar";
import {
  getCommissionsTranApiCall,
  getAgencyApiCall,
} from "../../store/transactions";
import "../styles/Transactions.css";

const Transctions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommissionsTranApiCall());
    dispatch(getAgencyApiCall());
  }, []);
  return (
    <>
      <NavBar />
      <NewTransactionForm />
      <TransactionResult />
    </>
  );
};

export default Transctions;
