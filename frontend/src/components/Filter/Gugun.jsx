import { useEffect } from 'react';

const GugunSelectBox = ({ isAll, setRegion, region }) => {
  const handleChange = (e) => {
    console.log('e.target.value: ', e.target.value);
    setRegion(e.target.value);
  };

  // const changeSelected = () => {
  //   console.log('isAll: ', isAll);
  //   if (isAll === 'All') {
  //     const $select = document.querySelector('#selectGugunAll');
  //     $select.value = region;
  //   } else if (isAll === 'GwangJu') {
  //     const $select = document.querySelector('#selectGugunGwangJu');
  //     $select.value = region;
  //   }
  // };

  // useEffect(() => {
  //   changeSelected();
  // }, []);

  if (isAll === 'All') {
    return (
      <select id="selectGugunAll" value={region} onClick={handleChange} readOnly>
        <option value="placeholder" disabled>
          선택
        </option>
        <option value="00" readOnly>
          전체
        </option>
        {/* <option value="01">전체1</option> */}
      </select>
    );
  } else if (isAll === 'GwangJu')
    return (
      <select id="selectGugunGwangJu" value={region} onChange={handleChange} readOnly>
        <option value="placeholder" disabled>
          선택
        </option>
        <option value="10">전체</option>
        <option value="11">광산구</option>
        <option value="12">남구</option>
        <option value="13">동구</option>
        <option value="14">북구</option>
        <option value="15">서구</option>
      </select>
    );
};

export default GugunSelectBox;
