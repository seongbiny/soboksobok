// dependencies 설치
// npm install @material-ui/core
//npm install --save prop-types

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles, FormLabel, Chip, Typography, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '.5rem 0 .5rem',
    textAlign: 'center',
  },
  chipsDiv: {
    marginTop: '.3rem',
  },
  chip: {
    margin: '.5rem',
    padding: '0.5rem',
  },
  formHelperText: {
    textAlign: 'center',
  },
}));

// 1.0.5

const MultipleSelectChips = ({ value, setValue, options, label, error, setError }) => {
  const classes = useStyles();

  const handleClick = (clickedValue) => {
    if (setError) {
      setError('');
    }
    if (value.find((e) => e === clickedValue)) {
      const index = value.findIndex((e) => e === clickedValue);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);
    } else {
      setValue([...value, clickedValue]);
    }
  };

  return (
    <StyledContainer>
      <div className={classes.container}>
        <h5>
          <b>{label}</b>
        </h5>
        {Boolean(error) && (
          <FormHelperText className={classes.formHelperText} error={Boolean(error)}>
            {error}
          </FormHelperText>
        )}
        <div className={classes.chipsDiv}>
          {options && options.length
            ? options.map((option, i) => (
                <Chip
                  icon={option.icon}
                  className={classes.chip}
                  key={i}
                  color="primary"
                  variant={value.find((e) => e === option.value) ? 'default' : 'outlined'}
                  // variant={value.find((e) => e === option.value) ? 'outlined' : 'default'}
                  label={<Typography variant="body2">{`${option.label}`}</Typography>}
                  clickable
                  onClick={() => handleClick(option.value)}
                />
              ))
            : null}
        </div>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  margin-bottom: 2%;
`;

MultipleSelectChips.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  error: PropTypes.string,
  setError: PropTypes.func,
};

export default MultipleSelectChips;
