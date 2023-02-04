const Table = ({ trans }) => {
  if (trans.length === 0) {
    return <h4>We can't find any records for this customer.</h4>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>order number</th>
          <th>order date</th>
          <th>order amount</th>
          <th>customer name</th>
        </tr>
      </thead>
      <tbody>
        {trans.map((item) => (
          <tr key={item.id}>
            <td>{item.id} </td>
            <td>{item.date} </td>
            <td>${item.cost} </td>
            <td>{item.customer} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
