import { useEffect } from 'react';

const ChildSelectBox = ({ child, setChild }) => {
  const handleChange = (e) => {
    setChild(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };

  const changeSelected = () => {
    const $select = document.querySelector('#selectChild');
    $select.value = child;
  };

  useEffect(() => {
    changeSelected();
  }, [child]);

  return (
    <div>
      <select id="selectChild" defaultValue="placeholder" onChange={handleChange}>
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
