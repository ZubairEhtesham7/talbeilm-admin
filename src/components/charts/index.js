import React from "react";
import DataViz, { VizType } from "react-fast-charts";

function Chart() {
  const data = [
    [
      {
        x: "2017",
        y: 10,
        stroke: " #6A2135",
        fill: "transparent",
      },
      {
        x: "2018",
        y: 11,
        stroke: "#C13C37",
        fill: "transparent",
      },
      {
        x: "2019",
        y: 6,
        stroke: "lightblue",
        fill: "transparent",
      },
      {
        x: "2020",
        y: 8,
        stroke: "#E3862C",
        fill: "transparent",
      },
      {
        x: "2021",
        y: 9,
        stroke: "lightblue",
        fill: "transparent",
      },
      {
        x: "2022",
        y: 12,
        stroke: "#6A2135",
        fill: "transparent",
      },
    ],
    [
      {
        x: "2017",
        y: 6,
        fill: "#6A2135",
      },
      {
        x: "2018",
        y: 9,
        fill: "#C13C37",
      },
      {
        x: "2019",
        y: 2,
        fill: "blue",
      },
      {
        x: "2020",
        y: 5,
        fill: "#E3862C",
      },
      {
        x: "2021",
        y: 8,
        fill: "blue",
      },
      {
        x: "2022",
        y: 7,
        fill: "#6A2135",
      },
    ],
  ];
  return (
    <div>
      {" "}
      <DataViz
        id={"example-bar-chart"}
        vizType={VizType.BarChart}
        data={data}
        axisLabels={{ left: "Value", bottom: "Year" }}
      />
    </div>
  );
}

export default Chart;
