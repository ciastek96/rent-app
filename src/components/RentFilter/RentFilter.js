import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const SelectWrapper = styled.label`
  max-width: 140px;
  display: flex;
`;

const StyledSelect = styled.select`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 15px;
  padding: 6px 12px;
`;

const RentFilter = ({ handleChange }) => (
  <SelectWrapper>
    <StyledSelect onChange={handleChange}>
      <option value="all">Wszystkie</option>
      <option value="ended">Nieoddane</option>
      <option value="active">W trakcie</option>
      <option value="coming">Nadchodzące</option>
    </StyledSelect>
  </SelectWrapper>
);

RentFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default RentFilter;
