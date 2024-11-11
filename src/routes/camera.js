import styled from "styled-components";
import Summary from "../components/summary";

const Wrapper = styled.div`
  position: fixed;
  width: 90%;
  height: 90%;
  bottom: 15px;
  right: 15px;

  display: flex;
  gap: 20px;
`;

const WrapperLeft = styled.div`
  width: 60%;
  height: 780px;
`;

const WrapperRight = styled.div`
  width: 40%;
  height: 780px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MonitorMain = styled.div`
  background-color: #2a2a2a;
  border-radius: 35px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 95%;
`;

const MonitorSub = styled.div`
  background-color: #2a2a2a;
  border-radius: 35px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
`;

export default function Camera() {
  return (
    <Wrapper>
      <WrapperLeft>
        <Summary text={"외부"} />
        <MonitorMain>Loading...</MonitorMain>
      </WrapperLeft>
      <WrapperRight>
        <Summary text={"거실"} />
        <MonitorSub>Loading...</MonitorSub>
        <Summary text={"주방"} />
        <MonitorSub>Loading...</MonitorSub>
      </WrapperRight>
    </Wrapper>
  );
}
