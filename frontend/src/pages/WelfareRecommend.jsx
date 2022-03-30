import React, { useEffect, useState } from "react";
import Chart from "../components/WelfareRecommend/Chart";
import LineChart from "../components/WelfareRecommend/LineChart";
import FilterSlide from "../components/WelfareRecommend/FilterSlide";
import RecommendSlid from "../components/WelfareRecommend/RecommendSlide";
import styled from 'styled-components';
import { Avatar } from "@mui/material";
import { useSelector, shallowEqual } from 'react-redux';


function WelfareRecommend(){
    const {name, profile} = useSelector(state => ({name: state.userData.name,profile: state.userData.profile}), shallowEqual);

    const [username, setUserName] = useState('');
    const [userProfile, setUserProfile] = useState('');

    useEffect(()=>{
        console.log(name);
        console.log(profile);
        // setUserName(name);
        // setUserProfile(profile);
    },[])

    return(
        <StyledContainer>
            <StyledTop>
                <Avatar />
                <Chart />
                <LineChart />
            </StyledTop>
            <StyledMain>
                <FilterSlide />
                <RecommendSlid />
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
    padding: 2vw;
    width: 80vw;
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

export default WelfareRecommend;