import React from "react";
import Chart from "../components/WelfareRecommend/Chart";
import LineChart from "../components/WelfareRecommend/LineChart";
import Slide from "../components/WelfareRecommend/Slide";
import styled from 'styled-components';
import { Avatar } from "@mui/material";

const StyledContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    row-gap:30px;
    justify-content: center;
`;
const StyledBox = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
`;

function WelfareRecommend(){
    return(
        <StyledContainer>
            <Avatar />
            <Chart />
            <LineChart />
            <StyledBox>
                <Slide />
            </StyledBox>
        </StyledContainer>
    )
}
export default WelfareRecommend;