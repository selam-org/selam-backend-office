import "./styles/Transactions.css";

import TransactionsHeader from "../components/Transactions/TransactionsHeader";
import NewTransactionForm from "../components/Transactions/NewTransactionForm";
import TransactionResult from "../components/Transactions/TransactionResults";

const Transctions = () => {
  return (
    <>
      <TransactionsHeader />
      <NewTransactionForm />
      <TransactionResult />
    </>
  );
};

export default Transctions;
