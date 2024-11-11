import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 1.2rem;
  color: #878a96;
  margin-bottom: 15px;
`;

export default function Summary({ text }) {
  // props를 통해 내용을 동적으로 바꿀 수 있음
  return <Wrapper>{text}</Wrapper>;
}
