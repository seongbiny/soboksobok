import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function isLogin() {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return true;
  } else {
    return false;
  }
}

function Login() {
  const KAKAO_AUTH_URL = `http://j6c205.p.ssafy.io:8080/api/oauth2/authorization/kakao?redirect_uri=http://j6c205.p.ssafy.io:3000/oauth/kakao/callback`;
  let navigate = useNavigate();

  return (
    <div className="loginBtn">
      {!isLogin() ? (
        <div>
          <a href={KAKAO_AUTH_URL}>
            <img src="/kakao/kakao_login_small.png" id="kakao-login-btn" />
          </a>
        </div>
      ) : (
        <div>
          <Link to="/profile">
            <Button variant="primary">내 정보</Button>
          </Link>

          <Button
            variant="primary"
            onClick={() => {
              localStorage.removeItem('jwtToken');
              navigate('/', { replace: true });
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
