import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeClient, removeProduct } from '../../actions';
import { routes } from '../../routes/routes';
import MoreButton from '../MoreButton/MoreButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const ListWrapper = styled.div``;
const ListItemWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 10px 0;
  padding: 15px;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  grid-template-columns: 6% 92% 2%;
  align-items: center;
  position: relative;
`;

const PhotoWrapper = styled.div`
  height: 60px;
  width: 60px;
  background-color: ${({ theme }) => theme.green};
  background-image: ${({ photo }) => (photo ? `url(${photo})` : 'none')};
  background-size: cover;
  position: 50% 50%;
  border-radius: 50%;
`;

const Data = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: 0 5px;
  font-weight: 600;
  border-radius: 6px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.default};
`;

const Wrapper = styled.div`
  margin: 0 0 0 25px;

  h4 {
    margin: 0;
  }
`;

const ButtonWrapper = styled.div``;

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

const StyledDetails = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledDropdownMenu = styled(DropdownMenu)``;

const PRODUCTS = 'products';
const CLIENTS = 'clients';
const RENTS = 'rents';

const ListItem = ({ listType, id, values }) => {
  const [optionMenu, setOptionMenu] = useState(false);
  const dispatch = useDispatch();

  const { companyName, name, surname, selectedFile, productName, phone } = values;

  return (
    <ListWrapper>
      <ListItemWrapper>
        {listType === PRODUCTS || listType === RENTS ? <Data>12.02</Data> : <PhotoWrapper photo={selectedFile} />}
        <Wrapper>
          {listType === PRODUCTS ? (
            <h4>{productName}</h4>
          ) : (
            <>
              <h4>{companyName && companyName.length > 0 ? companyName : `${name} ${surname}`}</h4>
              <StyledDetails>
                <p>{phone}</p>
                <p>{phone}</p>
              </StyledDetails>
            </>
          )}
        </Wrapper>
        <ButtonWrapper>
          <MoreButton onClick={() => setOptionMenu(!optionMenu)} />
        </ButtonWrapper>
        {optionMenu && (
          <>
            <StyledDropdownMenu top="50%">
              <MenuItemList>
                <MenuItem onClick={listType === PRODUCTS ? () => dispatch(removeProduct(id)) : () => dispatch(removeClient(id))}>Usuń</MenuItem>
              </MenuItemList>
              <MenuItemList>
                <MenuItem as={Link} to={listType === PRODUCTS ? `${routes.products}/${id}` : `${routes.clients}/${id}`}>
                  Edytuj
                </MenuItem>
              </MenuItemList>
            </StyledDropdownMenu>
          </>
        )}
      </ListItemWrapper>
    </ListWrapper>
  );
};

ListItem.propTypes = {
  values: PropTypes.shape({
    productName: PropTypes.string,
    companyName: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    phone: PropTypes.string,
    nip: PropTypes.string,
    selectedFile: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
};

ListItem.defaultProps = {
  values: {},
  listType: PRODUCTS,
};

export default ListItem;
