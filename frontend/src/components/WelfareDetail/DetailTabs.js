import React from "react";
import styled from "styled-components";
import { Tabs, Tab } from "react-bootstrap";

const StyledTab = styled.div`
  box-sizing: border-box;

  width: 70vw;
  margin: 10px;
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
          1
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
