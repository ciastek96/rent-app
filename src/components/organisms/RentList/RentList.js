import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeClient, removeProduct } from '../../../actions';
import { routes } from '../../../routes/routes';
import MoreButton from '../../atoms/MoreButton/MoreButton';
import DropdownMenu from '../../atoms/DropdownMenu/DropdownMenu';

const ListWrapper = styled.div``;
const RentListWrapper = styled.div`
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

const RentList = ({ listType, id, values: { name, surname, productName, dateOfReturn, phone, companyName, city, selectedFile } }) => {
  const [optionMenu, setOptionMenu] = useState(false);
  const dispatch = useDispatch();

  return (
    <ListWrapper>
      <RentListWrapper>
        {listType === PRODUCTS || listType === RENTS ? <Data>{dateOfReturn}</Data> : <PhotoWrapper photo={selectedFile} />}
        <Wrapper>
          {console.log(dateOfReturn)}
          {listType === PRODUCTS ? (
            <h4>{productName}</h4>
          ) : (
            <>
              <h4>{companyName && companyName.length > 0 ? companyName : `${name} ${surname}`}</h4>
              <StyledDetails>
                <p>{city}</p>
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
      </RentListWrapper>
    </ListWrapper>
  );
};

RentList.propTypes = {
  values: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  productName: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  phone: PropTypes.string,
  selectedFile: PropTypes.string,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
};

RentList.defaultProps = {
  values: {},
  productName: '',
  name: '',
  surname: '',
  phone: '',
  selectedFile: '',
  listType: PRODUCTS,
};

export default RentList;
