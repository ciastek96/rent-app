import React from 'react';
import styled from 'styled-components';
import PlusIcon from '../../assets/icons/svg/interfaces/plus-a.svg';

const StyledWrapper = styled.label`
  min-width: 160px;
  height: 160px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.default};
  position: relative;
  border: 3px solid ${({ theme }) => theme.green};
  cursor: pointer;

  input {
    display: none;
  }
`;

const StyledAddButton = styled.button`
  border: 0;
  min-width: 35px;
  min-height: 35px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.green};
  background-image: url(${PlusIcon});
  background-size: 50%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  position: absolute;
  right: 8px;
  bottom: 8px;
  cursor: pointer;
`;

const ImageUploader = () => (
  <StyledWrapper htmlFor="image">
    <input id="image" type="file" accept="image/*" />
    <StyledAddButton />
  </StyledWrapper>
);

export default ImageUploader;
