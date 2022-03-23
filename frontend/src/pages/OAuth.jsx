import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAxios from '../api.js';
import { useStore } from '../store.jsx';

function Auth() {
  // BE에서 받은 token
  const token = new URL(window.location.href).searchParams.get('token');

  let navigate = useNavigate();

  const setUsername = useStore((state) => state.setUsername);
  const setEmail = useStore((state) => state.setEmail);
  const setAgeRange = useStore((state) => state.setAgeRange);
  const setGender = useStore((state) => state.setGender);
  const setProfileImage = useStore((state) => state.setProfileImage);

  const getToken = async () => {
    try {
      await localStorage.setItem('jwtToken', token);
      getProfile();
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      console.log(localStorage.getItem('jwtToken'));

      const axios = getAxios();
      console.log(axios.defaults.headers);
      let response = await axios.get('/api/users');

      console.log('카카오 : ', response.data);
      setUsername(response.data.body.user.username);
      setEmail(response.data.body.user.email);
      setAgeRange(response.data.body.user.ageRange);
      setGender(response.data.body.user.gender);
      setProfileImage(response.data.body.user.profileImage);
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
