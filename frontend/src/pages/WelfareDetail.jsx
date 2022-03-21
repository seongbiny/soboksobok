import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DetailTabs from '../components/WelfareDetail/DetailTabs';
import DetailMain from '../components/WelfareDetail/DetailMain';
import axios from 'axios';
import DetailCard from '../components/WelfareDetail/DetailCard';


function WelfareDetail(){
    let navigate = useNavigate();
    const welfareId = useParams().welfareId;
    const [title, setTitle] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/welfare/${welfareId}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    },[]);

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/welfare/${welfareId}/recommend`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    })

    return(
        <StyledContainer>
            <StyledTop>
                <div>
                    <h1>복지서비스 상세(중앙)</h1>
                    <div>다양한 복지 혜택을 찾고, 지원대상 및 선정기준 등 자세한 내용을 확인할 수 있습니다.</div>
                </div>
                <Button variant="contained" sx={{height: 35}} onClick={()=>{ navigate('/') }}>뒤로가기</Button>
            </StyledTop>
            <DetailMain />
            <DetailTabs />
            <StyledCard>
                <DetailCard />
                <DetailCard />
                <DetailCard />
            </StyledCard>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    box-sizing: border-box;
    display: grid;
    justify-content: center;
    margin-top: 5vh;
`;
const StyledCard = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
`;
const StyledTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    align-items: center;
`;
export default WelfareDetail;