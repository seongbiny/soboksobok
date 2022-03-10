import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DetailTabs from '../components/WelfareDetail/DetailTabs';
import DetailMain from '../components/WelfareDetail/DetailMain';
import WelfareCard from '../components/WelfareCard';

const StyledContainer = styled.div`
    box-sizing: border-box;
    border: 1px solid;
    display: grid;
    justify-content: center;
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
`;

function WelfareDetail(){
    let navigate = useNavigate();

    return(
        <StyledContainer>
            <StyledTop>
                <h1>복지서비스 상세</h1>
                <Button variant="primary" onClick={()=>{ navigate('/') }}>뒤로가기</Button>
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