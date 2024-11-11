import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Chart } from "chart.js/auto";
import { webserver } from "../../webserver";

const Canvas = styled.canvas``;

export default function BarGraph({ options }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // PM2.5 데이터를 가져오는 비동기 함수
  const getPm25DataForBarChart = async () => {
    try {
      const res = await fetch(`${webserver.raspberrypiLocal}/data2.php`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      return null;
    }
  };

  useEffect(() => {
    // 차트 초기화 함수
    const initializeChart = async () => {
      if (!chartRef.current) return;

      const ctx = chartRef.current.getContext("2d");

      // 기존 차트 인스턴스가 있다면 파괴
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // 새로운 차트 인스턴스 생성
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "PM2.5 Average",
              data: [],
              backgroundColor: "rgba(192, 75, 192, 0.2)",
              borderColor: "rgba(192, 75, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: options || {
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

      await updateBarChart(); // 초기 데이터 로드
    };

    // 차트 데이터 업데이트 함수
    const updateBarChart = async () => {
      const data = await getPm25DataForBarChart();
      if (!data || data.message) {
        console.error("No data found or data error");
        return;
      }

      const labels = data.map((item) => item.time_interval);
      const pm2_5Data = data.map((item) => item.PM2_5_avg);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.labels = labels;
        chartInstanceRef.current.data.datasets[0].data = pm2_5Data;
        chartInstanceRef.current.update();
      }
    };

    initializeChart(); // useEffect 내에서 차트 초기화 호출

    // 10분마다 차트 업데이트
    const intervalId = setInterval(updateBarChart, 10 * 60 * 1000);

    // cleanup 함수로 차트 인스턴스와 interval 제거
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      clearInterval(intervalId);
    };
  }, [options]);

  return <Canvas ref={chartRef} />;
}
