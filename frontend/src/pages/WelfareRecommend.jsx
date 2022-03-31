import React, { useEffect, useState } from "react";
import Chart from "../components/WelfareRecommend/Chart";
import LineChart from "../components/WelfareRecommend/LineChart";
import FilterSlide from "../components/WelfareRecommend/FilterSlide";
import RecommendSlid from "../components/WelfareRecommend/RecommendSlide";
import styled from 'styled-components';


function WelfareRecommend(){
    const [name, setName] = useState('User');
    const [profile, setProfile] = useState('');

    useEffect(()=>{
        setName(localStorage.getItem('name'))
        setProfile(localStorage.getItem('profile'))
    },[])

    return(
        <StyledContainer>
            <StyledTop>
                <img src={profile}></img>
                <Chart />
                <LineChart />
            </StyledTop>
            <StyledMain>
                <FilterSlide name={name} />
                <RecommendSlid name={name} />
            </StyledMain>
        </StyledContainer>
    )
}

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
    grid-row-gap: 20px;
    width: 70vw;
`;
const StyledContainer = styled.div`
    display: grid;
    justify-content: center;
    margin: auto;
    grid-template-columns: 70vw;
`;

export default WelfareRecommend;