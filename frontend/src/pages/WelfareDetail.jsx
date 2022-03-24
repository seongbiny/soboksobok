import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DetailTabs from '../components/WelfareDetail/DetailTabs';
import DetailMain from '../components/WelfareDetail/DetailMain';
import getAxios from '../api';
import DetailCard from '../components/WelfareDetail/DetailCard';


function WelfareDetail(){
    let navigate = useNavigate();
    const welfareId = useParams().welfareId;
    const [welfare, setWelfare] = useState({});
    const axios = getAxios();
    const [likeWelfares, setLikeWelfares] = useState([]);
    const [usedWelfares, setUsedWelfares] = useState([]);

    useEffect(()=>{
        axios.get(`/api/welfare/${welfareId}`)
            .then(res => {
                // console.log(res.data);
                setWelfare(res.data.body.welfare);
            })
            .catch(err => console.log(err));
    },[]);

    useEffect(()=>{
        const fetchLike = async () => {
            const request = await axios.get('/api/users/like');
            const datas = request.data.body.likeList;
            // console.log(update);
            if (datas.length !== 0) {
                const ids = await datas.map(data => data.welfareId);
                const likeIds = await new Set(ids);
                const arr = Array.from(likeIds);
                setLikeWelfares(arr);
            } else {
                setLikeWelfares([0])
            }
        }
        fetchLike();
        return () => setLikeWelfares([]);
    }, [])

    
    useEffect(()=>{
        const fetchUsed = async () => {
            const request = await axios.get('api/users/used');
            // console.log(request.data.body.usedWelfareList)
            const datas = request.data.body.usedWelfareList;
            // console.log(datas);
            if (datas.length !== 0) {
                const ids = await datas.map(data => data.welfareId);
                const usedIds = await new Set(ids);
                const arr = Array.from(usedIds);
                setUsedWelfares(arr);
                console.log(arr);
            } else {
                setUsedWelfares([0])
            }
        }
        fetchUsed();
        return () => setUsedWelfares([]);
    },[])

    
    return(
        <StyledContainer>
            <StyledTop>
                <div>
                    <h1>복지서비스 상세(중앙)</h1>
                    <div>다양한 복지 혜택을 찾고, 지원대상 및 선정기준 등 자세한 내용을 확인할 수 있습니다.</div>
                </div>
                <Button variant="contained" sx={{height: 35}} onClick={()=>{ navigate('/') }}>뒤로가기</Button>
            </StyledTop>
            {likeWelfares.length !== 0 && usedWelfares.length !== 0 ? 
            <DetailMain welfareId={welfareId} Name={welfare.welfare_service_name} Content={welfare.welfare_service_content} likeNum={likeWelfares} usedNum={usedWelfares} /> : 
            <div></div> }
            <DetailTabs target={welfare.welfare_target_detail} crit={welfare.welfare_crit} howto={welfare.welfare_howto} contact={welfare.welfare_contact} phone={welfare.welfare_phone}  />
            <StyledCard>
                {likeWelfares.length !== 0 && usedWelfares.length !== 0 ? <DetailCard likeNum={likeWelfares} /> : <DetailCard /> }
                {likeWelfares.length !== 0 && usedWelfares.length !== 0 ? <DetailCard likeNum={likeWelfares} /> : <DetailCard /> }
                {likeWelfares.length !== 0 && usedWelfares.length !== 0 ? <DetailCard likeNum={likeWelfares} /> : <DetailCard /> } 
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