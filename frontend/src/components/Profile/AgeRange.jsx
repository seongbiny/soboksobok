const AgeSelectBox = ({ setAgeRange }) => {
  const handleChange = (e) => {
    setAgeRange(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };

  return (
    <select id="selectAge" defaultValue="placeholder" onChange={handleChange}>
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="1~9">1~9</option>
      <option value="10~14">10~14</option>
      <option value="15~19">15~19</option>
      <option value="20~29">20~29</option>
      <option value="30~39">30~39</option>
      <option value="40~49">40~49</option>
      <option value="50~59">50~59</option>
      <option value="60~69">60~69</option>
      <option value="70~79">70~79</option>
      <option value="80~89">80~89</option>
      <option value="90~">90~</option>
    </select>
  );
};

export default AgeSelectBox;
