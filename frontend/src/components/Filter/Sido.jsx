const SidoSelectBox = ({ setIsAll }) => {
  const handleChange = (e) => {
    setIsAll(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };
  return (
    <select onChange={handleChange}>
      <option value="All">전국</option>
      <option value="GwangJu">광주</option>
    </select>
  );
};

export default SidoSelectBox;
