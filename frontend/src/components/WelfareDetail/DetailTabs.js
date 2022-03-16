import React from "react";
import styled from "styled-components";
import { Tabs, Tab } from "react-bootstrap";

const StyledTab = styled.div`
  box-sizing: border-box;
  margin: 10px;
  border-bottom: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
`;
const StyledDiv = styled.div`
  background: #f2f6f7;
  border-radius: 10px;
  padding: 1vw;
  margin: 5vh;
`;
const StyledMain = styled.div`
  font-size: 14px;
`;

function DetailTabs() {
  return (
    <StyledTab>
      <Tabs
        defaultActiveKey="지원대상"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="지원대상" title="지원대상">
          <li>
            국내의 대학(대학원 제외)에 재학 중이거나, 입학예정인 대한민국
            국민에게 지원합니다.
          </li>
          <StyledDiv>
            <div>선정기준</div>
            <StyledMain>
              대출 신청일 현재 만 35세 이하인 기초생활수급자 및 학자금지원 8구간
              이하 국내 고등교육기관 학부생을 지원합니다.
              <br />
              다자녀(3자녀 이상)가구 학부생의 경우 학자금지원 관계없이 취업 후
              상환 학자금대출 이용 가능합니다.
            </StyledMain>
          </StyledDiv>
        </Tab>

        <Tab eventKey="서비스 내용" title="서비스 내용">
          2
        </Tab>

        <Tab eventKey="신청방법" title="신청방법">
          3
        </Tab>

        <Tab eventKey="추가정보" title="추가정보">
          4
        </Tab>
      </Tabs>
    </StyledTab>
  );
}
export default DetailTabs;
