import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import GridIcon from '../../../assets/icons/svg/interfaces/nav-icon-grid.svg';
import ListIcon from '../../../assets/icons/svg/interfaces/nav-icon.svg';

const DisplayOptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  border: 0;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin: 15px 5px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  opacity: 0.3;
`;

const GridIconButton = styled(IconButton)`
  background-image: url(${GridIcon});
`;
const ListIconButton = styled(IconButton)`
  background-image: url(${ListIcon});
`;

const LayoutButtons = ({ setActiveView }) => {
  const GRID = 'grid';
  const LIST = 'list';
  return (
    <DisplayOptionsWrapper>
      <GridIconButton onClick={() => setActiveView(GRID)} />
      <ListIconButton onClick={() => setActiveView(LIST)} />
    </DisplayOptionsWrapper>
  );
};

LayoutButtons.propTypes = {
  setActiveView: PropTypes.func.isRequired,
};

export default LayoutButtons;
