import React from 'react';
import styled from 'styled-components';
import FileBase from 'react-file-base64';
import { PropTypes } from 'prop-types';
import PlusIcon from '../../assets/icons/svg/interfaces/plus-a.svg';

const Wrapper = styled.label`
  min-width: 160px;
  max-width: 160px;
  min-height: 160px;
  max-height: 160px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.default};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: 50% 50%;
  position: relative;
  border: 3px solid ${({ theme }) => theme.green};
  /* cursor: pointer; */
  margin-bottom: 25px;

  input {
    display: none;
  }
`;

const AddButton = styled.button`
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

const ImageUploader = ({ image }) => (
  <Wrapper image={image}>
    {/* <input id="image" type="file" /> */}
    {/* <AddButton /> */}
  </Wrapper>
);

ImageUploader.propTypes = {
  image: PropTypes.string,
};

ImageUploader.defaultProps = {
  image: '',
};

export default ImageUploader;
