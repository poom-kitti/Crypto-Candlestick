import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export default function Graph(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => {
      const resultArray = [["day", "low", "open", "close", "high"]];
      for (let i = 0; i < props.data.length; i++) {
        const dayData = props.data[i];
        const date = new Date(dayData["open_time"]);
        const open = parseFloat(dayData["OPEN"]);
        const close = parseFloat(dayData["CLOSE"]);
        const high = parseFloat(dayData["HIGH"]);
        const low = parseFloat(dayData["LOW"]);

        const candlestick = [date, low, open, close, high];
        resultArray.push(candlestick);
      }
      return resultArray;
    });
  }, [props]);

  const title = "Candlestick chart for " + props.symbol;

  return (
    <div>
      <Chart
        width={600}
        height={400}
        chartType="CandlestickChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          legend: "none",
          title: title,
          bar: { groupWidth: "75%" }, // Remove space between bars.
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
            risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
          },
          vAxis: {
            title: "Value ($)",
          },
        }}
      />
    </div>
  );
}
