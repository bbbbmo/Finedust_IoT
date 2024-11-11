import styled from "styled-components";
import SettingToggle from "./toggle";

const Wrapper = styled.div`
  width: 100%;
  height: 20%;
  color: black;
  background-color: #e2815e;
  border-radius: 35px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 25px;
  margin-top: 28px;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.span`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Switch = styled.div`
  margin-top: 20px;
  display: flex;

  align-items: center;
`;

export default function Control() {
  return (
    <Wrapper>
      <Title>공기 청정기 Auto Mode</Title>
      <Switch>
        <SettingToggle />
      </Switch>
    </Wrapper>
  );
}
