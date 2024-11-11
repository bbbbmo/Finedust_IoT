import { useEffect, useState } from "react";
import { weather } from "../open-weather";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  height: 70%;
  background-color: #0d050f;
  border-radius: 35px;
  padding-left: 30px;
  gap: 15px;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.span`
  margin-top: 25px;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const AirElement = styled.span`
  font-size: 1.5rem;
`;

const AirElementName = styled.span`
  display: inline-block;
  text-align: center;
  width: 110px;
  height: 40px;
  line-height: 40px; // 위,아래 가운데 정렬
  font-size: 1.8rem;
  border-radius: 10px;
  background-color: #5a9e64;
`;

const Highlight = styled.span`
  background-color: #e2ad5e;
  display: inline-block;
  text-align: center;
  width: 110px;
  height: 40px;
  line-height: 40px; // 위,아래 가운데 정렬
  font-size: 1.8rem;
  border-radius: 10px;
`;

const Unit = styled.span`
  font-size: 1rem;
  color: #2a2a2a;
`;

const Br = styled.div`
  margin-top: 10px;
  border: 1px solid #878a96;
  width: 320px;
`;

export default function OutdoorAir() {
  const [co, setCo] = useState(0);
  const [nh3, setNH3] = useState(0);
  const [no, setNO] = useState(0);
  const [o3, setO3] = useState(0);
  const [so2, setSO2] = useState(0);
  const [pm2_5, setPM2_5] = useState(0);
  const [pm10, setPM10] = useState(0);

  useEffect(() => {
    const fetchAir = async () => {
      try {
        const res = await fetch(
          `/data/2.5/air_pollution?lat=${weather.lat}&lon=${weather.lon}&appid=${weather.api}`
        );
        const data = await res.json();
        setCo(data.list[0].components.co);
        setNH3(data.list[0].components.nh3);
        setNO(data.list[0].components.no);
        setO3(data.list[0].components.o3);
        setSO2(data.list[0].components.so2);
        setPM2_5(data.list[0].components.pm2_5);
        setPM10(data.list[0].components.pm10);
      } catch (e) {
        alert(`error : ${e}`);
      }
    };
    fetchAir();
  }, []);
  return (
    <Wrapper>
      <Title>OutDoor Air</Title>
      <AirElement>
        <AirElementName>CO</AirElementName>
        {` ${co} `}
        <Unit>(μg/m3)</Unit>
        <Br />
      </AirElement>
      <AirElement>
        <AirElementName>NH3</AirElementName>
        {` ${nh3} `}
        <Unit>(μg/m3)</Unit>
        <Br />
      </AirElement>
      <AirElement>
        <AirElementName>NO</AirElementName>
        {` ${no} `}
        <Unit>(μg/m3)</Unit>
        <Br />
      </AirElement>
      <AirElement>
        <AirElementName>O3</AirElementName>
        {` ${o3} `}
        <Unit>(μg/m3)</Unit>
        <Br />
      </AirElement>
      <AirElement>
        <AirElementName>SO2</AirElementName>
        {` ${so2} `}
        <Unit>(μg/m3)</Unit>
        <Br />
      </AirElement>
      <AirElement>
        <Highlight>PM2.5</Highlight>
        {` ${pm2_5} `}
        <Unit>(μg/m3)</Unit>
        <Br />
      </AirElement>
      <AirElement>
        <Highlight>PM10</Highlight>
        {` ${pm10} `}
        <Unit>(μg/m3)</Unit>
      </AirElement>
    </Wrapper>
  );
}
