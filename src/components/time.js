import styled from "styled-components";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  margin-bottom: 40px;
  margin-top: 20px;
`;

const Hour = styled.span`
  font-size: 6rem;
  color: white;
`;

const Minute = styled.span`
  font-size: 6rem;
  color: white;
`;

const Days = styled.div`
  margin-top: 10px;
  font-size: 2rem;
  color: white;
`;

const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Time() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");

  const setTimer = () => {
    const date = new Date();
    setHour(String(date.getHours()).padStart(2, "0"));
    setMinute(String(date.getMinutes()).padStart(2, "0"));
    setWeek(WEEKDAY[date.getDay()]);
    setDay(String(date.getDate()).padStart(2, "0"));
    setMonth(String(date.getMonth() + 1).padStart(2, "0"));
    setYear(String(date.getFullYear()));
  };

  useEffect(() => {
    setTimer(); // 초기 시간 설정
    const timerId = setInterval(setTimer, 1000); // 1초마다 onTimer 호출, setInterval을 밖에 두지 않으면 리렌더링마다 새로운 setInterval 생성, 중첩되어 리소스 낭비
    return () => clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 정리
  }, []); // 빈 배열 의존성으로 처음에 한 번만 실행

  return (
    <Wrapper>
      <Hour>{hour} : </Hour>
      <Minute>{minute}</Minute>
      <Days>
        {day}/{month}/{year}, {week}
      </Days>
    </Wrapper>
  );
}
