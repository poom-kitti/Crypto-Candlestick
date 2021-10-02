import axios from "axios";
import React, { useState } from "react";
import Graph from "./Graph";

export default function Candlestick() {
  const [symbol, setSymbol] = useState("");
  const [isValidSymbol, setIsValidSymbol] = useState(true);
  const [data, setData] = useState([]);
  const [currentShownSymbol, setCurrentShownSymbol] = useState("");

  const getSymbol = (event) => {
    setSymbol(event.target.value);
    setIsValidSymbol(true);
  };

  const fetchCandlestick = () => {
    if (symbol.trim() === "") {
      setIsValidSymbol(false);
      return;
    }
    axios
      .get("http://localhost:8000/candlestick", {
        params: {
          symbol: symbol.trim(),
        },
      })
      .then((res) => {
        if (res.data.isOK === false) setIsValidSymbol(false);
        else {
          setData(res.data.data);
          setCurrentShownSymbol(symbol.toUpperCase());
        }
      })
      .catch((err) => {
        console.log(err);
        setIsValidSymbol(false);
      });
  };

  return (
    <div className="mt-5 d-flex flex-column align-items-center w-100">
      <div className="card w-50 mb-3">
        <div className="card-body">
          <h5 className="card-title">Choose a Cryptocurrency!</h5>
          <p className="card-text">
            Provide a cyrptocurrency symbol to track candlestick of the past
            week.
          </p>
          <div className="d-flex justify-content-between">
            <input
              type="text"
              onChange={getSymbol}
              className="form-control w-75 me-2"
              placeholder="Ex. BTC"
              aria-label="symbol"
            />
            <button
              onClick={fetchCandlestick}
              style={{ width: "8rem" }}
              className="btn btn-primary"
            >
              Enter
            </button>
          </div>
          {!isValidSymbol && (
            <p className="text-danger">Invalid cryptocurrency symbol</p>
          )}
        </div>
      </div>
      {data.length !== 0 && <Graph data={data} symbol={currentShownSymbol} />}
    </div>
  );
}
