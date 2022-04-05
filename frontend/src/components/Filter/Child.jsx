const ChildSelectBox = ({ child, setChild }) => {
  const handleChange = (e) => {
    setChild(e.target.value);
  };

  return (
    <div>
      <select id="selectChild" value={child} onChange={handleChange}>
        <option value="1">있음(출산예정/ 입양예정)</option>
        <option value="2">없음</option>
      </select>
    </div>
  );
};

export default ChildSelectBox;
