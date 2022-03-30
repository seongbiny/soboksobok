const SidoSelectBox = ({ setIsAll, isAll, setRegion, isDisable, setClickRegion }) => {
  const handleChange = (e) => {
    setIsAll(e.target.value);
    console.log('SIDO: ', e.target.value);
    setClickRegion(true);
    isDisable();
    if (e.target.value === 'All') {
      setRegion('00');
    } else if (e.target.value === 'GwangJu') {
      setRegion('10');
    }
  };

  return (
    <select id="selectSido" value={isAll} onChange={handleChange} readOnly>
      <option value="">선택</option>
      <option value="All">전국</option>
      <option value="GwangJu">광주</option>
    </select>
  );
};

export default SidoSelectBox;
