import React from 'react';

function Login() {
  //const REST_API_KEY = 'b0c4483210e0ea0db8f56255adbeeda5';
  //const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const KAKAO_AUTH_URL = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/kakao/callback`;

  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <img src="/kakao/kakao_login_small.png" id="kakao-login-btn" />
      </a>
    </div>
  );
}

export default Login;
