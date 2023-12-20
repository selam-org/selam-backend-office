import "../styles/Transactions.css";

import TransactionsHeader from "../../components/cashier/transactions/TransactionsHeader";
import NewTransactionForm from "../../components/cashier/transactions/NewTransactionForm";
import TransactionResult from "../../components/cashier/transactions/TransactionResults";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCommissionApiCall } from "../../store/commission";
const Transctions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommissionApiCall());
  }, []);
  return (
    <>
      <TransactionsHeader />
      <NewTransactionForm />
      <TransactionResult />
    </>
  );
};

export default Transctions;
