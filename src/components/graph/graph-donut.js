// HumidityDoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutGraph = ({ humidity }) => {
  const data = {
    labels: ["Humidity", "Remaining"],
    datasets: [
      {
        data: [humidity, 100 - humidity], // 습도와 나머지 비율
        backgroundColor: ["#5347de", "#e0e0e0"], // 습도와 나머지 색상
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // 도넛형 모양
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutGraph;
