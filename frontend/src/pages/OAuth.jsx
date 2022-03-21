import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const REST_API_KEY = 'b0c4483210e0ea0db8f56255adbeeda5';
  //카카오 로그인에서 사용할 OAuth Redirect URI를 설정합니다
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
  //토큰 발급 시, 보안을 강화하기 위해 Client Secret을 사용할 수 있습니다. (REST API인 경우에 해당)
  const CLIENT_SECRET = 'pe7y4NArlDuQpJYXu8nxNFitPddPonFY';

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');

  let navigate = useNavigate();

  const getToken = async () => {
    const payload = qs.stringify({
      // 문자열 맨 앞의 ?를 생력
      // 쿼리의 파싱 결과 값은 무조건 문자열
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    try {
      // access token 가져오기
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);

      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      // navigate('/', { replace: true });
      navigate('/profile', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
}

export default Auth;
