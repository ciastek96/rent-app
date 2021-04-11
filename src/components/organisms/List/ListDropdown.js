import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Toggle from '../../../providers/Toggle';
import DropdownMenu from '../../atoms/DropdownMenu/DropdownMenu';
import MoreButton from '../../atoms/MoreButton/MoreButton';
import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick';
import { routes } from '../../../routes/routes';

const ButtonWrapper = styled.div`
  text-align: right;
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

const PRODUCTS = 'products';
const CLIENTS = 'clients';

const ListDropdown = ({ id, listType, handleDelete, setIsModalOpen }) => {
  const ref = useRef(null);

  return (
    <Toggle
      render={({ isOpen, setIsOpen }) => (
        <>
          {useDetectOutsideClick(ref, setIsOpen)}
          <ButtonWrapper ref={ref}>
            <MoreButton onClick={() => setIsOpen(!isOpen)} />
          </ButtonWrapper>
          <DropdownMenu top="30px" right="35px" isOpen={isOpen}>
            <MenuItemList>
              <MenuItem onClick={() => handleDelete(setIsModalOpen)}>Usuń</MenuItem>
            </MenuItemList>
            <MenuItemList>
              <MenuItem as={Link} to={listType === PRODUCTS ? `${routes.products}/${id}` : `${routes.clients}/${id}`}>
                Edytuj
              </MenuItem>
            </MenuItemList>
          </DropdownMenu>
        </>
      )}
    />
  );
};

ListDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
  handleDelete: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

ListDropdown.defaultProps = {
  listType: PRODUCTS,
};

export default ListDropdown;
