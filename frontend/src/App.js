import React from "react";
import Navbar from "./components/layout/Navbar";
import Candlestick from "./components/Candlestick";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="d-flex justify-content-center">
        <Candlestick />
      </div>
    </div>
  );
}

export default App;
