import React from "react";
import Chart from "react-google-charts";
import "./style.css";

function Graph2() {
  const LineData = [
    ["x", "dogs", "cats"],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
  ];
  const LineChartOptions = {
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Popularity",
    },
    series: {
      0: { curveType: "function" },
      1: { curveType: "function" },
    },
  };
  return (
    <div>
      <div className="graph22">
        <Chart
          width={"1000px"}
          height={"410px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LineData}
          options={LineChartOptions}
          rootProps={{ "data-testid": "2" }}
        />
      </div>
    </div>
  );
}

export default Graph2;
