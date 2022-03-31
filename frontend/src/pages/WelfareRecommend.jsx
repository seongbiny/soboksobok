import React, { useEffect, useState } from "react";
import Chart from "../components/WelfareRecommend/Chart";
import LineChart from "../components/WelfareRecommend/LineChart";
import FilterSlide from "../components/WelfareRecommend/FilterSlide";
import RecommendSlid from "../components/WelfareRecommend/RecommendSlide";
import styled from 'styled-components';
import { Avatar } from "@mui/material";
import { useSelector, shallowEqual, useStore } from 'react-redux';


function WelfareRecommend(){
    // const name = useSelector(state =>state.userData.name);
    // const profile = useSelector(state =>state.userData.profile);
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');

    useEffect(()=>{
        // console.log(name);
        // console.log(profile);
        console.log(localStorage.getItem('name'));
        setName(localStorage.getItem('name'))
        console.log(localStorage.getItem('profile'));
        setProfile(localStorage.getItem('profile'))
    },[])

    return(
        <StyledContainer>
            <StyledTop>
                <Avatar />
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