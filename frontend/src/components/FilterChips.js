import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MultipleSelectChips from '../MultipleSelectChips.js';
import getAxios from '../api.js';
import SidoSelectBox from './Filter/Sido.jsx';
import GugunSelectBox from './Filter/Gugun.jsx';
import ChildSelectBox from './Filter/Child.jsx';

const map = new Map();
map.set(15, 0); //학생
map.set(16, 1); //무직
map.set(17, 2); //창업
map.set(18, 3); //농어업인
map.set(19, 4); //중소기업
map.set(20, 5); //일반
map.set(23, 0); //무주택자
map.set(24, 1); //임산부
map.set(25, 2); //미취학
map.set(26, 3); //다문화/탈북민
map.set(27, 4); //다자녀
map.set(28, 5); //보훈대상자
map.set(29, 6); //장애인
map.set(30, 7); //저소득
map.set(31, 8); //한부모/조손
map.set(32, 9); //신용불량자
map.set(33, 10); //독거노인
map.set(34, 11); //취약계층

function FilterChips() {
  const [value, setValue] = useState([]);
  const [error, setError] = useState('');
  const [isAll, setIsAll] = useState('All');
  const [region, setRegion] = useState('');
  const [child, setChild] = useState('');

  const job = [
    { label: '학생', value: 15 },
    { label: '무직 (실업자(취업희망자))', value: 16 },
    { label: '창업(영세자영업(창업)자)', value: 17 },
    { label: '농어업인', value: 18 },
    { label: '중소기업(저소득근로자)', value: 19 },
    { label: '일반', value: 20 },
  ];

  const family = [
    { label: '무주택자', value: 23 },
    { label: '임산부', value: 24 },
    { label: '미취학', value: 25 },
    { label: '다문화/탈북민', value: 26 },
    { label: '다자녀', value: 27 },
    { label: '보훈대상자', value: 28 },
    { label: '장애인', value: 29 },
    { label: '저소득', value: 30 },
    { label: '한부모/조손', value: 31 },
    { label: '신용불량자', value: 32 },
    { label: '독거노인', value: 33 },
    { label: '저취약계층소득', value: 34 },
  ];

  const selectJob = [];
  const selectFamily = [];

  for (let element of value) {
    if (element >= 15 && element <= 20) {
      selectJob.push(map.get(element));
    } else if (element >= 23 && element <= 34) {
      selectFamily.push(map.get(element));
    }
  }

  const setFilter = async () => {
    try {
      const axios = getAxios();
      console.log(axios.defaults.headers);
      console.log({
        child: parseInt(child),
        region: parseInt(region),
        job: selectJob,
        family: selectFamily,
      });

      await axios.post('/api/users/update', {
        child: parseInt(child),
        region: parseInt(region),
        job: selectJob,
        family: selectFamily,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getFilter = async () => {
    try {
      const axios = getAxios();
      console.log(axios.defaults.headers);

      let res = await axios.get('/api/users/update');
      console.log(res.data.body.UserCharacter);
      console.log('Child: ', res.data.body.UserCharacter.child);
      setChild(res.data.body.UserCharacter.child);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFilter();
  }, []);

  return (
    <div>
      <SidoSelectBox setIsAll={setIsAll} />
      <GugunSelectBox isAll={isAll} setRegion={setRegion} />
      <p>{region}</p>

      <MultipleSelectChips
        label="대상특성"
        value={value}
        setValue={setValue}
        options={job}
        error={error}
        setError={setError}
      />

      <ChildSelectBox child={child} setChild={setChild}></ChildSelectBox>
      <p>{child}</p>

      <MultipleSelectChips
        label="가구특성"
        value={value}
        setValue={setValue}
        options={family}
        error={error}
        setError={setError}
      />
      <Button
        variant="primary"
        onClick={() => {
          setFilter();
          // navigate('/', { replace: true });
        }}
      >
        저장
      </Button>
    </div>
  );
}

export default FilterChips;
