import React from "react";
import Dashbaordtable from "../dashbaordtable";
import Graph2 from "../graph2";
import "./style.css";
import Chart from "../charts";

function Dashboard() {
  return (
    <div className="">
      <Chart />
      <br />
      <Graph2 />
      <br />
      <Dashbaordtable />
      <br />
    </div>
  );
}

export default Dashboard;
