import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import GridIcon from '../../assets/icons/svg/interfaces/nav-icon.svg';
import ListIcon from '../../assets/icons/svg/interfaces/nav-icon-list.svg';

const StyledDisplayOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledIcon = styled.button`
  border: 0;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin: 15px 5px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  opacity: 0.3;
`;

const StyledGridIcon = styled(StyledIcon)`
  background-image: url(${GridIcon});
`;
const StyledListIcon = styled(StyledIcon)`
  background-image: url(${ListIcon});
`;

const LayoutButtons = ({ setActiveView }) => {
  const GRID = 'grid';
  const LIST = 'list';
  return (
    <StyledDisplayOptions>
      <StyledGridIcon onClick={() => setActiveView(GRID)} />
      <StyledListIcon onClick={() => setActiveView(LIST)} />
    </StyledDisplayOptions>
  );
};

LayoutButtons.propTypes = {
  setActiveView: PropTypes.func.isRequired,
};

export default LayoutButtons;
