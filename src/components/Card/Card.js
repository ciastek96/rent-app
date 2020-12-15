import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeClient } from '../../actions';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import MoreButton from '../MoreButton/MoreButton';
import { routes } from '../../routes/routes';
import EmailIcon from '../../assets/icons/svg/interfaces/at.svg';

const Wrapper = styled.div`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.white};
  min-height: 420px;
  display: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: relative;

  &::before {
    content: '';
    height: 6px;
    width: 100%;
    background-color: ${({ theme }) => theme.green};
  }
`;

const StyledMoreButton = styled(MoreButton)`
  margin: 0 15px 0 auto;
`;

const Photo = styled.div`
  background-color: ${({ theme }) => theme.default};
  border-radius: 50%;
  height: 225px;
  width: 225px;
  cursor: pointer;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 125px;
  background-color: ${({ theme }) => theme.default};
  text-align: center;
  padding: 10px;
`;

const Info = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
const MenuItemList = styled.li`
  list-style: none;
`;

const MenuItem = styled.a`
  display: block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  margin: 0;
  padding: 12px 24px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.default};
  }
`;

const StyledDropdownMenu = styled(DropdownMenu)``;

const Card = ({ id, name, phone, city }) => {
  const [optionMenu, setOptionMenu] = useState(false);
  const dispatch = useDispatch();

  if (!name) return <p>Brak pozycji. </p>;
  return (
    <Wrapper>
      <StyledMoreButton onClick={() => setOptionMenu(!optionMenu)} />
      <Photo />
      <InnerWrapper>
        <h4>{name}</h4>
        <Info>
          <p>{phone}</p>
          <p>{city}</p>
        </Info>
      </InnerWrapper>
      {optionMenu && (
        <>
          <StyledDropdownMenu top="25px">
            <MenuItemList>
              <MenuItem onClick={() => dispatch(removeClient(id))}>Usuń</MenuItem>
            </MenuItemList>
            <MenuItemList>
              <MenuItem as={Link} to={`${routes.clients}/${id}`}>
                Edytuj
              </MenuItem>
            </MenuItemList>
          </StyledDropdownMenu>
        </>
      )}
    </Wrapper>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Card;
