// 1번. 라인차트로 한그래프에 여러개 중첩
// 2번. 스택차트로 일별 평균량 pm2.5

import styled from "styled-components";
import Summary from "../components/summary";
import LineGraph from "../components/graph/graph-line";
import BarGraph from "../components/graph/graph-bar";

const Wrapper = styled.div`
  position: fixed;
  background-color: #2a2a2a;
  width: 90%;
  height: 90%;
  bottom: 15px;
  right: 15px;
  border-radius: 35px;
  padding-left: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const WrapperTop = styled.div`
  display: flex;
  gap: 20px;
`;

const Container = styled.div``;

const ChartWrapper = styled.div`
  display: flex;
  width: 650px;
  height: 600px;
  background-color: #0d050f;
  border-radius: 35px;
  padding: 20px;
  align-items: center;
`;

const WrapperBottom = styled.div`
  color: white;
`;

const Element = styled.span`
  display: inline-block;
  text-align: center;
  font-weight: 500;
  width: 220px;
  height: 60px;
  line-height: 60px; // 위,아래 가운데 정렬
  font-size: 1.5rem;
  border-radius: 10px;
  background-color: #5a9e64;
  margin-right: 20px;
`;

export default function Air() {
  return (
    <Wrapper>
      <WrapperTop>
        <Container>
          <Summary text={"실시간 미세먼지 농도"} />
          <ChartWrapper>
            <LineGraph />
          </ChartWrapper>
        </Container>
        <Container>
          <Summary text={"최근 3시간 미세먼지 농도 평균"} />
          <ChartWrapper>
            <BarGraph />
          </ChartWrapper>
        </Container>
      </WrapperTop>
      <WrapperBottom>
        <Element>실내 미세먼지 기준</Element>
        PM-10의 경우 75㎍/㎥ 이하, PM-2.5의 경우 35㎍/㎥ 이하 유지 권장
        (생활법령 실내 공기질 유지기준)
      </WrapperBottom>
    </Wrapper>
  );
}
