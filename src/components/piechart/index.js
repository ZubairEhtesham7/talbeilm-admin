import React from "react";
import { PieChart } from "react-minimal-pie-chart";
function PieChart22() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PieChart
        style={{
          width: "30rem",
        }}
        data={[
          { title: "One", value: 20, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
      />
      ;
    </div>
  );
}

export default PieChart22;
