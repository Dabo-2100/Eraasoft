import { useState, useRef } from "react";

export default function App() {
  const newBalanceInput = useRef();
  const [balance, setBalance] = useState(
    localStorage.getItem("balance") ? +localStorage.getItem("balance") : 0
  );

  const [history, setHistory] = useState(
    localStorage.getItem("history")
      ? Array.isArray(JSON.parse(localStorage.getItem("history")))
        ? JSON.parse(localStorage.getItem("history"))
        : []
      : []
  );

  const deposit = () => {
    let OrginalB = balance;
    let newB = balance + +newBalanceInput.current.value;
    setBalance(newB);

    let logs = [...history];
    logs.push({
      beforeBalance: OrginalB,
      logType: "deposit",
      value: +newBalanceInput.current.value,
      afterBalance: OrginalB + +newBalanceInput.current.value,
    });
    setHistory(logs);
    newBalanceInput.current.value = "";
    localStorage.setItem("history", JSON.stringify(logs));
    localStorage.setItem("balance", newB);
  };

  const withdraw = () => {
    if (balance >= +newBalanceInput.current.value) {
      let OrginalB = balance;
      let newB = balance - +newBalanceInput.current.value;
      setBalance(newB);
      let logs = [...history];
      logs.push({
        beforeBalance: OrginalB,
        logType: "withdraw",
        value: +newBalanceInput.current.value,
        afterBalance: OrginalB - +newBalanceInput.current.value,
      });
      setHistory(logs);
      localStorage.setItem("history", JSON.stringify(logs));
      localStorage.setItem("balance", newB);
    } else {
      alert("Can not Withdraw");
    }
    newBalanceInput.current.value = "";
  };
  return (
    <div className="col-12 App">
      <h1>Your Balance is : {balance} EGP</h1>
      <input
        ref={newBalanceInput}
        className="form-control"
        placeholder="Enter Amount"
      ></input>
      <button
        className="btn btn-success"
        onClick={() => {
          deposit();
        }}
      >
        Deposit
      </button>
      <button onClick={withdraw} className="btn btn-danger">
        Withdraw
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>-</td>
            <td>Balance Before</td>
            <td>Transaction Type</td>
            <td>Transaction Value</td>
            <td>Balance After</td>
          </tr>
        </thead>
        <tbody>
          {history.map((log, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{log.beforeBalance}</td>
                <td>{log.logType}</td>
                <td>{log.value}</td>
                <td>{log.afterBalance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
