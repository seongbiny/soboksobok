import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import MultipleSelectChips from './Filter/MultipleSelectChips.js';
import SidoSelectBox from './Filter/Sido.jsx';
import GugunSelectBox from './Filter/Gugun.jsx';
import ChildSelectBox from './Filter/Child.jsx';
import { getAxios, getAxiosDjango } from '../api.js';
import { useNavigate } from 'react-router-dom';

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
familyMap.set(2, 25); //미취학 --> 1인가구
familyMap.set(3, 26); //다문화/탈북민
familyMap.set(4, 27); //다자녀
familyMap.set(5, 28); //보훈대상자
familyMap.set(6, 29); //장애인
familyMap.set(7, 30); //저소득 --> 신규전입
familyMap.set(8, 31); //한부모/조손
familyMap.set(9, 32); //신용불량자 --> 확대가족
familyMap.set(10, 33); //독거노인 --> 요양환자/치매환자
familyMap.set(11, 34); //취약계층
familyMap.set(12, 35); // --> 해당없음

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
  { label: '1인가구', value: 25 },
  { label: '다문화/탈북민', value: 26 },
  { label: '다자녀', value: 27 },
  { label: '보훈대상자', value: 28 },
  { label: '장애인', value: 29 },
  { label: '신규전입', value: 30 },
  { label: '한부모/조손', value: 31 },
  { label: '확대가족', value: 32 },
  { label: '요양환자/치매환자', value: 33 },
  { label: '취약계층', value: 34 },
  { label: '해당없음', value: 35 },
];

function FilterChips() {
  let navigate = useNavigate();

  const [userSeq, setUserSeq] = useState('');
  const [value, setValue] = useState([0]); //value에 없는 임의의 초기값 저장
  const [clicked, setCliked] = useState([]);
  const [error, setError] = useState('');
  // const [isAll, setIsAll] = useState('All');
  // const [region, setRegion] = useState('00');
  const [child, setChild] = useState('2');
  const [job, setJob] = useState([]);
  const [family, setFamily] = useState([]);

  const setFilter = async () => {
    try {
      const selectJob = [];
      const selectFamily = [];

      for (let element of clicked) {
        if (element >= 15 && element <= 20) {
          selectJob.push(map.get(element));
        } else if (element >= 23 && element <= 35) {
          selectFamily.push(map.get(element));
        }
      }

      // await console.log({
      //   child: child,
      //   region: region,
      //   job: selectJob,
      //   family: selectFamily,
      // });

      const axios = getAxios();
      await axios.post('/api/users/update/char', {
        child: child ? child : '2',
        // region: region ? region : '00',
        job: selectJob,
        family: selectFamily,
      });

      const djangoAxios = getAxiosDjango();
      let res = await djangoAxios.get(`/insertusergroup/dbscan/${userSeq}`);
      console.log('django res: ', res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getFilter = async () => {
      try {
        const axios = getAxios();
        let response = await axios.get('/api/users/profile');
        setUserSeq(response.data.body.user.userSeq);
        console.log('userSeq: ', userSeq);

        let res = await axios.get('/api/users/update/char');
        console.log('userCharacter: ', res.data.body);
        // setRegion(res.data.body.UserCharacter.region);
        setChild(res.data.body.UserCharacter.child);
        setJob(res.data.body.UserCharacter.job);
        setFamily(res.data.body.UserCharacter.family);

        // if (region === '00' || region === null) {
        //   setIsAll('All');
        // } else {
        //   setIsAll('GwangJu');
        // }

        let allValue = [];
        for (let element of job) {
          await allValue.push(jobMap.get(element));
        }
        for (let element of family) {
          await allValue.push(familyMap.get(element));
        }
        console.log(value, '+', allValue);
        if (JSON.stringify(value) !== JSON.stringify(allValue)) {
          setValue([...allValue]);
          setCliked([...allValue]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFilter();
  }, []);

  return (
    <StyledFilterSet>
      {/* <SidoSelectBox setIsAll={setIsAll} isAll={isAll} setRegion={setRegion} region={region} />
            <GugunSelectBox isAll={isAll} setRegion={setRegion} region={region} />*/}

      <MultipleSelectChips
        label="직장"
        value={clicked}
        setValue={setCliked}
        options={jobChip}
        error={error}
        setError={setError}
      />

      <StyledChildArea>
        <h5 style={{ marginBottom: '15px' }}>
          <b>자녀</b>
        </h5>
        <ChildSelectBox child={child} setChild={setChild}></ChildSelectBox>
      </StyledChildArea>

      <StyledFamilyArea>
        <MultipleSelectChips
          label="상황"
          value={clicked}
          setValue={setCliked}
          options={familyChip}
          error={error}
          setError={setError}
        />
      </StyledFamilyArea>

      <Button
        style={{
          marginTop: '2%',
          paddingRight: '9%',
          paddingLeft: '9%',
        }}
        onClick={() => {
          setFilter();
          navigate('/', { replace: true });
        }}
      >
        저장
      </Button>
    </StyledFilterSet>
  );
}

const StyledFilterSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFamilyArea = styled.div`
  width: 70%;
`;

const StyledChildArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-bottom: 2%;
  align-items: center;
`;

export default FilterChips;
