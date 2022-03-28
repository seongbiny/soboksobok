const SidoSelectBox = ({ setIsAll, isAll, setRegion, region }) => {
  const handleChange = (e) => {
    setIsAll(e.target.value);
    console.log('SIDO: ', e.target.value);
    if (e.target.value === 'All') {
      setRegion('00');
    } else {
      setRegion('10');
    }
  };

  return (
    <select id="selectSido" value={isAll} onChange={handleChange} readOnly>
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="All">전국</option>
      <option value="GwangJu">광주</option>
    </select>
  );
};

export default SidoSelectBox;
