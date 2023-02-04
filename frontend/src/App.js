import { useState, useEffect } from "react";

import DropdownList from "./components/DropdownList";
import Container from "react-bootstrap/Container";
import Table from "./components/Table";
import "./App.css";

function App() {
  const [trans, SetTrans] = useState([]);
  const [name, SetName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3005/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              transList(customerName: "${name}") {
                id,
                date,
                cost,
                customer
              }
            }
          `,
        }),
      }).then((res) => res.json());

      SetTrans(data.data.transList);
    };

    fetchData();
  }, [name]);

  const selectHandler = (selected) => {
    SetName(selected);
  };

  return (
    <Container className="container p-3 bg-light rounded-3">
      <h2 className="header title">Welcome to points center</h2>
      <div className="dropdown">
        <DropdownList selectHandler={selectHandler} />
      </div>
      {name.length === 0 && <h4>Please select a customer</h4>}
      {name.length !== 0 && (
        <>
          <div className="text-container">
            <h4 className="text">
              total amount: $
              {trans.reduce((acc, item) => {
                return acc + item.cost;
              }, 0)}
            </h4>
            <h4 className="text">
              total rewards:{" "}
              {trans.reduce((acc, item) => {
                const gt100 =
                  Number.parseInt(item.cost) - 100 >= 0
                    ? Number.parseInt(item.cost) - 100
                    : 0;
                const gt50 =
                  Number.parseInt(item.cost) - 50 >= 0
                    ? Number.parseInt(item.cost) - 100 >= 0
                      ? 50
                      : Number.parseInt(item.cost) - 50
                    : 0;

                return acc + gt100 * 2 + gt50 * 1;
              }, 0)}{" "}
              points
            </h4>
          </div>
          <div className="table">
            <Table trans={trans} />
          </div>
        </>
      )}
    </Container>
  );
}

export default App;
