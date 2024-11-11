import styled from "styled-components";
import { weather } from "../open-weather";
import { useEffect, useState } from "react";
import windspeed from "../images/windspeed.png";
import smillingface from "../images/smilingface.png";
import mehface from "../images/mehface.png";
import frownface from "../images/frownface.png";
import DonutGraph from "./graph/graph-donut";
import LoadingScreen from "./loading-screen";

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  > * {
    width: 170px;
    height: 220px;
    border-radius: 35px;
    background-color: #0d050f;
    font-size: 2rem;
    color: white;
    text-align: center;
    transition: all 0.4s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Cloud = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Humidity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Wind = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Pollution = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const WeatherIcon = styled.img`
  width: 110px;
  //attrs 사용법 익히기, 조건부 사용일때는 attrs가 좋음
`;

const ChartWrapper = styled.div`
  width: 110px;
  height: 110px;
`;

const WindSpeedIcon = styled.img`
  width: 110px;
`;

const PollutionIcon = styled.img`
  width: 110px;
`;

const Title = styled.span`
  font-size: 1rem;
  color: #2a2a2a;
`;

export default function Weather() {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [face, setFace] = useState(smillingface);

  const changePollutionIcon = async (pm10) => {
    // pm10의 데이터에 따라 아이콘이 바뀜
    if (pm10 <= 80) {
      setFace(smillingface);
    } else if (pm10 <= 150) {
      setFace(mehface);
    } else {
      setFace(frownface);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${weather.lat}&lon=${weather.lon}&appid=${weather.api}&lang=${weather.lang}&units=${weather.units}`
        );
        const data = await res.json();
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setWeatherIcon(data.weather[0].icon);
        setIsLoading(false);
      } catch (e) {
        alert(`error : ${e}`);
      }
    };

    const fetchAir = async () => {
      try {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${weather.lat}&lon=${weather.lon}&appid=${weather.api}`
        );
        const data = await res.json();
        changePollutionIcon(data.list[0].components.pm10); // pm10의 데이
      } catch (e) {
        alert(`error : ${e}`);
      }
    };
    fetchWeather();
    fetchAir();
  }, []);
  return (
    <Wrapper>
      <Cloud>
        <Title>Weather</Title>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <WeatherIcon
            src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="Weather"
          />
        )}

        {temp ? `${temp}°C` : "Loading..."}
      </Cloud>
      <Humidity>
        <Title>Humidity</Title>
        <ChartWrapper>
          <DonutGraph humidity={humidity} />
        </ChartWrapper>
        {humidity ? `${humidity}%` : "Loading..."}
      </Humidity>
      <Wind>
        <Title>Wind speed</Title>
        <WindSpeedIcon src={windspeed} />
        {wind ? `${wind}m/s` : "Loading..."}
      </Wind>
      <Pollution>
        <Title>Air quality</Title>
        <PollutionIcon src={face} />
        Good!
      </Pollution>
    </Wrapper>
  );
}
