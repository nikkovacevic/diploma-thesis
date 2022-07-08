import React from "react";
import { Bar } from "react-chartjs-2";

export default function MojChart({ labels, values }) {
  return (
    <div style={{ paddingLeft: 75, paddingRight: 75, marginTop: 60 }}>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Odpadki [kg]",
              data: values,
              backgroundColor: ["rgba(61, 169, 252, 0.8)"],
              borderColor: ["rgba(61, 169, 252, 1)"],
              borderWidth: 3,
              borderRadius: 8,
            },
          ],
        }}
        height={400}
        width={300}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
        }}
      />
    </div>
  );
}
