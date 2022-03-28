import { useEffect } from 'react';

const SidoSelectBox = ({ setIsAll, isAll, setRegion, region }) => {
  const handleChange = (e) => {
    setIsAll(e.target.value);
    console.log('e.target.value: ', e.target.value);
    if (e.target.value === 'All') {
      setRegion('00');
    } else {
      setRegion('10');
    }
  };

  // const changeSelected = () => {
  //   if (region === '00') {
  //     setIsAll('All');
  //   } else {
  //     setIsAll('GwangJu');
  //   }
  // };

  useEffect(() => {
    // changeSelected();
    console.log('sido isAll: ', isAll);
  }, []);

  return (
    <select id="selectSido" value={isAll} onChange={handleChange}>
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="All">전국</option>
      <option value="GwangJu">광주</option>
    </select>
  );
};

export default SidoSelectBox;
