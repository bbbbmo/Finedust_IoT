import styled from "styled-components";
import Time from "../components/time";
import Location from "../components/location";
import Weather from "../components/weather";
import OutdoorAir from "../components/outdoor-air";
import Control from "../components/control";
import Summary from "../components/summary";
import BarGraph from "../components/graph/graph-bar";
import LineGraph from "../components/graph/graph-line";
import { Link, Outlet } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  background-color: #2a2a2a;
  width: 90%;
  height: 90%;
  bottom: 15px;
  right: 15px;
  border-radius: 35px;
  padding-left: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
`;

const WrapperLeft = styled.div`
  width: 70%;
`;

const WrapperLeftBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const WrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 30%;
  margin-right: 30px;
`;

const ChartWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d050f;
  width: 352px;
  height: 240px;
  border-radius: 35px;
  font-size: 2rem;
  color: white;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <WrapperLeft>
        <Location />
        <Time />
        <Summary text="Today" />
        <Weather />
        <Summary text="Indoor Air" />
        <WrapperLeftBottom>
          <Link to="/air">
            <ChartWrapper>
              <LineGraph
                options={{
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </ChartWrapper>
          </Link>
          <Link to="/air">
            <ChartWrapper to="/air">
              <BarGraph
                options={{
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </ChartWrapper>
          </Link>
        </WrapperLeftBottom>
      </WrapperLeft>
      <WrapperRight>
        <Control />
        <OutdoorAir />
      </WrapperRight>
    </Wrapper>
  );
}
