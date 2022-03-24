const SidoSelectBox = ({ setIsAll }) => {
  const handleChange = (e) => {
    setIsAll(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };
  return (
    <select defaultValue="placeholder" onChange={handleChange}>
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="All">전국</option>
      <option value="GwangJu">광주</option>
    </select>
  );
};

export default SidoSelectBox;
