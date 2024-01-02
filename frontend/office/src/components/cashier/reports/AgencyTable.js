const AgencyTable = () => {
  return (
    <table className="agency-table">
      <thead>
        <tr>
          <th className="index-column-th"> </th>
          <th>Agency</th>
          <th>Agent</th>
          <th>CURRENCY</th>
          <th>MTS Balance</th>
          <th>Product Balance</th>
          <th>Services Balance</th>
          <th>Receipts</th>
          <th>Vault</th>
          <th>Grand Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="index-column-td">1</td>
          <td>HQ</td>
          <td>SE001</td>
          <td>USD</td>
          <td>119,140,251.38</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>119,140,251.38</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AgencyTable;
