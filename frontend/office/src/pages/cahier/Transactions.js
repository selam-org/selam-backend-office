import "../styles/Transactions.css";

import TransactionsHeader from "../../components/transactions/TransactionsHeader";
import NewTransactionForm from "../../components/transactions/NewTransactionForm";
import TransactionResult from "../../components/transactions/TransactionResults";

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
