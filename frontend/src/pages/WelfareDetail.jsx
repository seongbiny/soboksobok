import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DetailTabs from '../components/WelfareDetail/DetailTabs';
import DetailMain from '../components/WelfareDetail/DetailMain';
import WelfareCard from '../components/WelfareCard';

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

function WelfareDetail(){
    let navigate = useNavigate();

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
                <WelfareCard />
                <WelfareCard />
                <WelfareCard />
            </StyledCard>
        </StyledContainer>
    )
}
export default WelfareDetail;