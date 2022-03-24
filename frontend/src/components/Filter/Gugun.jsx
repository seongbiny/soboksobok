const GugunSelectBox = ({ isAll }) => {
  if (isAll === 'All') {
    return (
      <select>
        <option value="00">전체</option>
      </select>
    );
  }
  if (isAll === 'GwangJu')
    return (
      <select>
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
