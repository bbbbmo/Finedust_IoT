import { weather } from "../open-weather";
import { useEffect, useState } from "react";
import Summary from "./summary";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 6px;
  height: 24px;
`;

const Icon = styled.span`
  display: inline-block;
  width: 24px;

  margin-bottom: 2px;
`;

const Location = () => {
  // 리액트 컴포넌트는 비동기 함수로 정의하면 안됨 async X
  const [region, setRegion] = useState("");
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(
          `/data/2.5/weather?lat=${weather.lat}&lon=${weather.lon}&appid=${weather.api}&lang=${weather.lang}&units=${weather.units}`
        );
        const data = await res.json();
        console.log(data);
        setRegion(`${data.name}, Korea`);
      } catch (e) {
        alert(`error : ${e}`);
      }
    };
    fetchLocation();
  }, []);
  return (
    <Wrapper>
      <Icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </Icon>
      <Summary text={region ? region : "Loading..."} />
    </Wrapper>
  );
};

export default Location;
