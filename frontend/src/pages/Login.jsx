import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

function Login() {
  const KAKAO_AUTH_URL = `http://j6c205.p.ssafy.io:8080/api/oauth2/authorization/kakao?redirect_uri=http://j6c205.p.ssafy.io:3000/oauth/kakao/callback`;
  // const KAKAO_AUTH_URL = `http://j6c205.p.ssafy.io:8080/api/oauth2/authorization/kakao?redirect_uri=http://j6c205.p.ssafy.io:3000/oauth/kakao/callback`;
  let navigate = useNavigate();

  return (
    <div className="loginBtn">
      {!isLogin() ? (
        <div>
          <a href={KAKAO_AUTH_URL}>
            {/* <img src="/kakao/kakao_login_small.png" id="kakao-login-btn" /> */}
            <Button
              style={{
                backgroundColor: '#90CAF9',
                borderColor: '#90CAF9',
                fontWeight: 'bold',
                fontSize: 'large',
              }}
              // onClick={() => {
              //   window.location.replace('/');
              // }}
            >
              로그인
            </Button>
          </a>
        </div>
      ) : (
        <div>
          <Link to="/profile">
            <Button
              style={{
                backgroundColor: '#90CAF9',
                borderColor: '#90CAF9',
                fontWeight: 'bold',
                fontSize: 'large',
                marginRight: '5px',
              }}
            >
              내 정보
            </Button>
          </Link>

          <Button
            style={{
              backgroundColor: '#90CAF9',
              borderColor: '#90CAF9',
              fontWeight: 'bold',
              fontSize: 'large',
            }}
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('name');
              localStorage.removeItem('profile');
              // navigate('/', { replace: true });
              window.location.replace('/');
            }}
          >
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
