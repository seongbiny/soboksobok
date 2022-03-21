import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
  //const REST_API_KEY = 'b0c4483210e0ea0db8f56255adbeeda5';
  //카카오 로그인에서 사용할 OAuth Redirect URI를 설정합니다
  //const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
  //토큰 발급 시, 보안을 강화하기 위해 Client Secret을 사용할 수 있습니다. (REST API인 경우에 해당)
  //const CLIENT_SECRET = 'pe7y4NArlDuQpJYXu8nxNFitPddPonFY';

  // BE에서 받은 token
  const token = new URL(window.location.href).searchParams.get('token');

  let navigate = useNavigate();

  const getToken = async () => {
    try {
      localStorage.setItem('jwtToken', token);
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []); //대괄호 안에 실행조건을 추가. 조건이 없으므로 한번 실행하고 끝남.

  return null;
}

export default Auth;
