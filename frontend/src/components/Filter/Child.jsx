const ChildSelectBox = ({ child, setChild }) => {
  const handleChange = (e) => {
    setChild(e.target.value);
    console.log('Child --> e.target.value: ', e.target.value);
  };

  return (
    <div>
      <select id="selectChild" defaultValue={child} onChange={handleChange}>
        <option value="placeholder" disabled>
          선택
        </option>
        <option value="1">있음(출산예정/ 입양예정)</option>
        <option value="2">없음</option>
      </select>
    </div>
  );
};

export default ChildSelectBox;
