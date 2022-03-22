import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../api.js';
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
      localStorage.setItem('jwtToken', token);
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      let response = await Axios.get('/api/users');
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
    getProfile();
  }, []); //대괄호 안에 실행조건을 추가. 조건이 없으므로 한번 실행하고 끝남.

  return null;
}

export default Auth;
