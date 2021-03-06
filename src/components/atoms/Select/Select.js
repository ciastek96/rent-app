import React from 'react';
import styled, { css } from 'styled-components';
import { PropTypes } from 'prop-types';
import SearchIcon from '../../../assets/icons/svg/interfaces/search.svg';

const StyledSelect = styled.select`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  padding: 12px 24px;

  ${({ search }) =>
    search &&
    css`
      background-image: url(${SearchIcon});
      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 12px 50%;
      padding: 12px 36px;
      max-width: 320px;
    `}

  ${({ isCorrect }) =>
    isCorrect &&
    css`
      border: 1px solid ${({ theme }) => theme.green};
    `}
`;

const Wrapper = styled.div`
  margin: 12px 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  span {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const Select = ({ label, id, ...props }) => {
  if (label) {
    return (
      <Wrapper>
        <Label htmlFor={id}>
          <span>{label}</span>
        </Label>
        <StyledSelect {...props} />
      </Wrapper>
    );
  }
  return <StyledSelect {...props} />;
};

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

Select.defaultProps = {
  label: null,
  id: null,
};

export default Select;
