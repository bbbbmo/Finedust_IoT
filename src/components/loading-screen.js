import styled from "styled-components";

const Wrapper = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d050f;
`;
const Text = styled.span`
  color: white;
  font-size: 20px;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}
