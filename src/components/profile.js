import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 25px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileIcon = styled.div`
  cursor: pointer; /* 클릭 가능 표시 */
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.05);
  }
  width: 50px;
  height: 50px;
  svg {
    fill: #4a81e8;
  }
`;

const Greeting = styled.div`
  color: white;
`;

export default function Profile() {
  return (
    <Wrapper>
      <Greeting>Welcome to 미세먼지 IoT!, HomePi😊</Greeting>
      <ProfileIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      </ProfileIcon>
    </Wrapper>
  );
}
