import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFound(){
    let navigate = useNavigate();
    return (
        <div style={{marginTop: '15vh', textAlign:'center', marginBottom: '5vh'}}>
            <div style={{fontFamily: 'Noto Sans KR', fontSize: '7vh', margin:'auto'}}>요청하신 페이지를 찾을 수 없습니다.</div>
            <img src="drawKit/SVG/DrawKit (10).svg" width="40%" alt="404" style={{margin:'auto'}}/>
            <div>
                <Button onClick={() => {
                    navigate('/');
                }}>
                돌아가기
                </Button>
            </div>
        </div>
    )
}