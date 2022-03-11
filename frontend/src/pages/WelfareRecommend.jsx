import React from "react";
import Chart from "../components/WelfareRecommend/Chart";
import LineChart from "../components/WelfareRecommend/LineChart";
import styled from 'styled-components';
import Slide from "../components/WelfareRecommend/Slide";

const StyledContainer = styled.div`

`;

function WelfareRecommend(){
    return(
        <StyledContainer>
            <Chart />
            <LineChart />
            <Slide />
        </StyledContainer>
    )
}
export default WelfareRecommend;