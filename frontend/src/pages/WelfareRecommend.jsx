import React, { useEffect, useState } from "react";
import Chart from "../components/WelfareRecommend/Chart";
import LineChart from "../components/WelfareRecommend/LineChart";
import FilterSlide from "../components/WelfareRecommend/FilterSlide";
import RecommendSlid from "../components/WelfareRecommend/RecommendSlide";
import ProfileCard from "../components/WelfareRecommend/ProfileCard";
import styled from 'styled-components';
import { getAxios } from "../api";
import Norecommend from "../components/WelfareRecommend/Norecommend";


function WelfareRecommend(){
    const axios = getAxios();
    const [name, setName] = useState('User');
    const [profile, setProfile] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(()=>{
        setName(localStorage.getItem('name'))
        setProfile(localStorage.getItem('profile'))
    },[])

    useEffect(() => {
        const fetchCard = async () => {
          try {
            const request = await axios.get("/api/welfare/recommend");
            console.log(request.data.body.welfare);
            setCards(request.data.body.welfare);
          } catch (err) {
            console.log(err);
          }
        };
        fetchCard();
      }, []);
    
    return(
        (cards.length) === 0 ? 
            <Norecommend profile={profile} name={name}></Norecommend> :
            <StyledContainer>
            <StyledTop>
                <ProfileCard profile={profile} name={name} />
                <Chart />
                <LineChart />
            </StyledTop>
            <StyledMain>
                <FilterSlide name={name} cards={cards} />
                <RecommendSlid name={name} />
            </StyledMain>
        </StyledContainer>
    )
}

const StyledTop = styled.div`
    display: grid;
    grid-template-columns: 20% 40% 40%;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
    // margin-bottom: 5vh;
`;
const StyledMain = styled.div`
    display: grid;
    justify-content: center;
    // margin-bottom: 5vh;
    // margin-top: 5vh;
    grid-row-gap: 10vh;
    width: 70vw;
`;
const StyledContainer = styled.div`
    display: grid;
    justify-content: center;
    margin: auto;
    grid-template-columns: 70vw;
    font-family: 'Noto Sans KR', sans-serif;
    margin-bottom: 5vh;
`;

export default WelfareRecommend;