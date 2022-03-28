import { useEffect } from 'react';

const SidoSelectBox = ({ setIsAll, setRegion, region }) => {
  const handleChange = (e) => {
    setIsAll(e.target.value);
    console.log('e.target.value: ', e.target.value);
    if (e.target.value === 'All') {
      setRegion('00');
    } else {
      setRegion('10');
    }
  };

  const changeSelected = () => {
    const $select = document.querySelector('#selectSido');
    if (region === '00') {
      $select.value = 'All';
      setIsAll('All');
    } else {
      $select.value = 'GwangJu';
      setIsAll('GwangJu');
    }
  };

  useEffect(() => {
    changeSelected();
  }, []);

  return (
    <select id="selectSido" defaultValue="placeholder" onChange={handleChange}>
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="All">전국</option>
      <option value="GwangJu">광주</option>
    </select>
  );
};

export default SidoSelectBox;
