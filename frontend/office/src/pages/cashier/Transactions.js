import "../styles/Transactions.css";

import TransactionsHeader from "../../components/cashier/transactions/TransactionsHeader";
import NewTransactionForm from "../../components/cashier/transactions/NewTransactionForm";
import TransactionResult from "../../components/cashier/transactions/TransactionResults";

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
