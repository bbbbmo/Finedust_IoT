import styled from "styled-components";
import Summary from "../components/summary";
import { useState } from "react";

const Wrapper = styled.div`
  position: fixed;
  width: 90%;
  height: 90%;
  bottom: 15px;
  right: 15px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50%;
`;

const WrapperBottom = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50%;
`;

const Container = styled.div``;

const Room = styled.div`
  width: 400px;
  height: 320px;
  background-color: #2a2a2a;
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const Bulb = styled.div`
  width: 120px;
  cursor: pointer;
  svg {
    fill: ${(props) => (props.isActive ? "#e2ad5e" : "#CECECE")};
    transition: fill 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default function Light() {
  const [activeBulbId, setActiveBulbId] = useState(null);

  const onOffBulb = (e) => {
    const clickedId = e.currentTarget.id;
    setActiveBulbId((prevId) => (prevId === clickedId ? null : clickedId));
  };

  return (
    <Wrapper>
      <WrapperTop>
        {[1, 2, 3].map((id) => (
          <Container key={id}>
            <Summary text={`Room${id}`} />
            <Room>
              <Bulb
                id={`room${id}`}
                isActive={activeBulbId === `room${id}`}
                onClick={onOffBulb}
              >
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
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </Bulb>
              {activeBulbId === `room${id}` ? "Light ON" : "Light OFF"}
            </Room>
          </Container>
        ))}
      </WrapperTop>
      <WrapperBottom>
        {[4, 5, 6].map((id) => (
          <Container key={id}>
            <Summary text={`Room${id}`} />
            <Room>
              <Bulb
                id={`room${id}`}
                isActive={activeBulbId === `room${id}`}
                onClick={onOffBulb}
              >
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
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </Bulb>
              {activeBulbId === `room${id}` ? "Light ON" : "Light OFF"}
            </Room>
          </Container>
        ))}
      </WrapperBottom>
    </Wrapper>
  );
}
