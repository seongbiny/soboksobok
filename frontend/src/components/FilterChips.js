import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MultipleSelectChips from './Filter/MultipleSelectChips.js';
import SidoSelectBox from './Filter/Sido.jsx';
import GugunSelectBox from './Filter/Gugun.jsx';
import ChildSelectBox from './Filter/Child.jsx';
import getAxios from '../api.js';

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

const jobMap = new Map();
jobMap.set(0, 15); //학생
jobMap.set(1, 16); //무직
jobMap.set(2, 17); //창업
jobMap.set(3, 18); //농어업인
jobMap.set(4, 19); //중소기업
jobMap.set(5, 20); //일반

const familyMap = new Map();
familyMap.set(0, 23); //무주택자
familyMap.set(1, 24); //임산부
familyMap.set(2, 25); //미취학
familyMap.set(3, 26); //다문화/탈북민
familyMap.set(4, 27); //다자녀
familyMap.set(5, 28); //보훈대상자
familyMap.set(6, 29); //장애인
familyMap.set(7, 30); //저소득
familyMap.set(8, 31); //한부모/조손
familyMap.set(9, 32); //신용불량자
familyMap.set(10, 33); //독거노인
familyMap.set(11, 34); //취약계층

function FilterChips() {
  const [value, setValue] = useState([0]); //value에 없는 임의의 초기값 저장
  const [clicked, setCliked] = useState([]);
  const [error, setError] = useState('');
  const [isAll, setIsAll] = useState('All');
  const [region, setRegion] = useState('');
  const [child, setChild] = useState('');
  const [clickedChild, setClickedChild] = useState('');
  const [job, setJob] = useState([]);
  const [family, setFamily] = useState([]);

  const jobChip = [
    { label: '학생', value: 15 },
    { label: '무직 (실업자(취업희망자))', value: 16 },
    { label: '창업(영세자영업(창업)자)', value: 17 },
    { label: '농어업인', value: 18 },
    { label: '중소기업(저소득근로자)', value: 19 },
    { label: '일반', value: 20 },
  ];

  const familyChip = [
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

  const setFilter = async () => {
    try {
      const axios = getAxios();
      // console.log(axios.defaults.headers);

      const selectJob = [];
      const selectFamily = [];

      for (let element of clicked) {
        if (element >= 15 && element <= 20) {
          selectJob.push(map.get(element));
        } else if (element >= 23 && element <= 34) {
          selectFamily.push(map.get(element));
        }
      }

      console.log({
        child: String(child),
        region: String(region),
        job: selectJob,
        family: selectFamily,
      });

      await axios.post('/api/users/update/char', {
        child: String(child),
        region: String(region),
        job: selectJob,
        family: selectFamily,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getFilter = async () => {
      try {
        const axios = getAxios();
        let res = await axios.get('/api/users/update/char');
        console.log(res.data.body);

        setRegion(res.data.body.UserCharacter.region);
        setChild(res.data.body.UserCharacter.child);
        // if (child != clickedChild) {
        //   setClickedChild(child);
        // }

        setJob(res.data.body.UserCharacter.job);
        setFamily(res.data.body.UserCharacter.family);
        let allValue = [];
        for (let element of job) {
          await allValue.push(jobMap.get(element));
        }
        for (let element of family) {
          await allValue.push(familyMap.get(element));
        }
        console.log(value, '+', allValue);
        if (JSON.stringify(value) != JSON.stringify(allValue)) {
          setValue([...allValue]);
          setCliked([...allValue]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFilter();
  }, [value]);

  return (
    <div>
      {/* <SidoSelectBox setIsAll={setIsAll} isAll={isAll} setRegion={setRegion} region={region} />
      <GugunSelectBox setIsAll={setIsAll} isAll={isAll} setRegion={setRegion} region={region} />
      <p>{region}</p>
      <p>{value}</p> */}

      <MultipleSelectChips
        label="대상특성"
        value={clicked}
        setValue={setCliked}
        options={jobChip}
        error={error}
        setError={setError}
      />

      <ChildSelectBox child={child} setChild={setChild}></ChildSelectBox>
      <p>{child}</p>

      <MultipleSelectChips
        label="가구특성"
        value={clicked}
        setValue={setCliked}
        options={familyChip}
        error={error}
        setError={setError}
      />
      <Button
        variant="primary"
        onClick={() => {
          setFilter();
        }}
      >
        저장
      </Button>
    </div>
  );
}

export default FilterChips;
