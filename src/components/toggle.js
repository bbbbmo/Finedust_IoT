import { useState } from "react";
import styled from "styled-components";
import { webserver } from "../webserver";

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Toggle = styled.div`
  transition: background-color 0.3s;
  position: relative;
  width: 102px;
  height: 48px;
  border-radius: 32px;
  padding: 2px;
  background-color: ${({ $isToggleOn }) =>
    $isToggleOn ? "#5347de" : "#CECECE"};
`;

const ToggleButton = styled.div`
  transition: transform 0.3s;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: white;
  transform: ${({ $isToggleOn }) =>
    $isToggleOn ? "translateX(52px)" : "translateX(0)"};
`;

const SettingToggle = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const toggleRelay = async () => {
    const state = !isToggleOn ? "on" : "off"; // 반대값을 state로 설정

    try {
      const response = await fetch(`${webserver.nodemcu}/toggleRelay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `state=${state}`,
      });

      const result = await response.json();
      console.log("Response from NodeMCU:", result);
      if (result.status === "success") {
        setIsToggleOn((prev) => !prev); // 상태 변경 수행
        console.log(`Relay turned ${state}`);
      } else {
        console.error("Failed to update relay state:", result.reason);
      }
    } catch (error) {
      console.error("Error sending request to NodeMCU:", error);
    }
  };

  return (
    <ToggleWrap
      onClick={toggleRelay} // 상태 변경을 toggleRelay 함수에 맡김
      aria-pressed={isToggleOn}
      role="switch"
    >
      <Toggle $isToggleOn={isToggleOn}>
        <ToggleButton $isToggleOn={isToggleOn} />
      </Toggle>
    </ToggleWrap>
  );
};

export default SettingToggle;
