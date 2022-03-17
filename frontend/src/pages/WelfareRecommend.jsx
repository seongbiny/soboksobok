import React from "react";
import Chart from "../components/WelfareRecommend/Chart";
import LineChart from "../components/WelfareRecommend/LineChart";
import Slide from "../components/WelfareRecommend/Slide";
import styled from 'styled-components';
import { Avatar } from "@mui/material";

const StyledTop = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
    margin-bottom: 5vh;
`;
const StyledMain = styled.div`
    display: grid;
    justify-content: center;
    margin-bottom: 5vh;
    margin-top: 5vh;
`;
const StyledContainer = styled.div`
    display: grid;
    width: 80vw;
    justify-content: center;
    margin: auto;
`;

function WelfareRecommend(){
    return(
        <StyledContainer>
            <StyledTop>
                <Avatar />
                <Chart />
                <LineChart />
            </StyledTop>
            <StyledMain>
                <Slide />
                {/* <Slide /> */}
            </StyledMain>
        </StyledContainer>
    )
}
export default WelfareRecommend;