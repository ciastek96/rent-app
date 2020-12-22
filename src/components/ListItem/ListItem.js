import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeClient, removeProduct } from '../../actions';
import { routes } from '../../routes/routes';
import MoreButton from '../MoreButton/MoreButton';
import Modal from '../Modal/Modal';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const ListItemWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 10px 0;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 5fr 3fr 2fr 1fr;
  align-items: center;
  position: relative;

  & > p {
    text-align: center;
  }
`;

const PhotoWrapper = styled.div`
  height: 60px;
  width: 60px;
  background-color: ${({ theme }) => theme.default};
  background-image: ${({ photo }) => (photo ? `url(${photo})` : 'none')};
  background-size: cover;
  position: 50% 50%;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  margin-left: 10px;
  h4 {
    margin: 0;
  }
`;

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

const Title = styled.div`
  text-align: left;
  p {
    margin-top: 5px;
  }
`;

const StyledDropdownMenu = styled(DropdownMenu)``;

const PRODUCTS = 'products';
const CLIENTS = 'clients';

const ListItem = ({ listType, id, values }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false);
  const dispatch = useDispatch();

  const { name, surname, selectedFile, productName, email, phone, discount, price, quantity, unit } = values;

  const handleDelete = () => {
    setOptionMenu(false);
    setIsModalOpen(true);
  };

  const onConfirm = () => {
    if (listType === PRODUCTS) dispatch(removeProduct(id));
    else dispatch(removeClient(id));
    setIsModalOpen(false);
  };

  return (
    <>
      <ListItemWrapper>
        <PhotoWrapper photo={selectedFile} />
        <Wrapper>
          {listType === PRODUCTS ? (
            <Title>
              <h4>{productName}</h4>
            </Title>
          ) : (
            <Title>
              <h4>{`${name} ${surname}`}</h4>
              <p>{email}</p>
            </Title>
          )}
        </Wrapper>
        {listType === PRODUCTS ? (
          <>
            <p>{`${quantity} ${unit}`}</p>
            <p>{`${price} zł`}</p>
          </>
        ) : (
          <>
            <p>{phone}</p>
            <p>{discount}</p>
          </>
        )}
        <ButtonWrapper>
          <MoreButton onClick={() => setOptionMenu(!optionMenu)} />
        </ButtonWrapper>
        <StyledDropdownMenu top="30px" right="35px" isOpen={optionMenu}>
          <MenuItemList>
            <MenuItem onClick={() => handleDelete()}>Usuń</MenuItem>
          </MenuItemList>
          <MenuItemList>
            <MenuItem as={Link} to={listType === PRODUCTS ? `${routes.products}/${id}` : `${routes.clients}/${id}`}>
              Edytuj
            </MenuItem>
          </MenuItemList>
        </StyledDropdownMenu>
      </ListItemWrapper>
      {isModalOpen && (
        <Modal
          title="Uwaga!"
          content="Czy na pewno chcesz usunąć pozycję?"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          confirmFn={onConfirm}
        />
      )}
    </>
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
    email: PropTypes.string,
    discount: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
    unit: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
};

ListItem.defaultProps = {
  values: {},
  listType: PRODUCTS,
};

export default ListItem;
