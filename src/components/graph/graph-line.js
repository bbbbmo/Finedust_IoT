import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Chart } from "chart.js/auto";
import { webserver } from "../../webserver";

const Canvas = styled.canvas``;

export default function LineGraph({ options }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const getPmDataFromDB = async () => {
    try {
      const res = await fetch(`${webserver.raspberrypiLocal}/data.php`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      return null;
    }
  };

  useEffect(() => {
    const initializeChart = async () => {
      if (!chartRef.current) return; // chartRef가 null이 아니면 실행

      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "PM1.0",
              data: [],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "PM2.5",
              data: [],
              backgroundColor: "rgba(192, 75, 192, 0.2)",
              borderColor: "rgba(192, 75, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "PM10",
              data: [],
              backgroundColor: "rgba(192, 192, 75, 0.2)",
              borderColor: "rgba(192, 192, 75, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: options || {
          // 옵션 두가지
          scales: {
            x: {
              display: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const updateChart = async () => {
        const data = await getPmDataFromDB();
        if (!data || data.message) {
          console.error("No data found or data error");
          return;
        }

        const timeLabel = new Date().toLocaleTimeString("ko-KR");
        const avgData = [data.PM1_0_avg, data.PM2_5_avg, data.PM10_avg];

        chartInstanceRef.current.data.labels.push(timeLabel);
        chartInstanceRef.current.data.datasets[0].data.push(avgData[0]);
        chartInstanceRef.current.data.datasets[1].data.push(avgData[1]);
        chartInstanceRef.current.data.datasets[2].data.push(avgData[2]);

        if (chartInstanceRef.current.data.labels.length > 10) {
          chartInstanceRef.current.data.labels.shift();
          chartInstanceRef.current.data.datasets[0].data.shift();
          chartInstanceRef.current.data.datasets[1].data.shift();
          chartInstanceRef.current.data.datasets[2].data.shift();
        }

        chartInstanceRef.current.update();
      };

      await updateChart();

      const intervalId = setInterval(updateChart, 10 * 1000);

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        clearInterval(intervalId);
      };
    };

    requestAnimationFrame(initializeChart); // initializeChart를 DOM이 완전히 로드된 후 호출
  }, [options]);

  return <Canvas ref={chartRef} />;
}
