import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { removeRent } from '../../actions';
import Button from '../Button/Button';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Modal from '../Modal/Modal';
import RentStatus from '../RentStatus/RentStatus';
import MoreButton from '../MoreButton/MoreButton';
import { routes } from '../../routes/routes';

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.white};
  margin: 15px 0;
  border-radius: 6px;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadow};
  overflow: hidden;
  display: grid;
  grid-template-columns: 4fr 12fr 1fr;
  padding: 30px 0;

  &::before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 6px;
    background-color: ${({ theme, activeStatus }) => (activeStatus ? theme.status[activeStatus] : theme.green)};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 0;
  }
`;

const StyledMoreButton = styled(MoreButton)`
  margin: 0 15px 0 auto;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  & > div {
    margin: 15px 0;
  }

  h5 {
    margin-bottom: 5px;
  }
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

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductsListItem = styled.div``;

const RentItem = ({ id, client: { label, companyName, nip, address, discount }, dateOfRent, dateOfReturn, products }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [status, setStatus] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false);
  const productList = useSelector((state) => products.map((product) => state.products.filter((item) => item._id === product)));

  const dispatch = useDispatch();

  const handleDelete = () => {
    setOptionMenu(false);
    setIsModalOpen(true);
  };

  const onConfirm = () => {
    dispatch(removeRent(id));
    setIsModalOpen(false);
  };

  const createAndDownloadPdf = () => {
    axios
      .post('http://localhost:4000/create-pdf', { name: 'siema', price: '123', id: '01' })
      .then(() => axios.get('http://localhost:4000/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      });
  };

  const stateList = ['active', 'coming', 'ended'];

  const today = moment();
  const startDay = moment(dateOfRent);
  const endDay = moment(dateOfReturn);

  useEffect(() => {
    if (endDay.diff(today, 'days') >= 0) {
      if (startDay.diff(today, 'days')) setStatus(stateList[0]);
      else setStatus(stateList[1]);
    } else setStatus(stateList[2]);
  }, []);

  return (
    <Wrapper isCollapsed={isCollapsed} activeStatus={status}>
      <RentStatus status={status} />
      <Details>
        <h2>{label}</h2>

        <DetailsGrid>
          <div>
            <h5>ID zamówienia</h5>
            <p>{id}</p>
          </div>

          <div>
            <h5>Ilość produktów</h5>
            <p>{products.length}</p>
          </div>

          <div>
            <h5>Data wynajmu</h5>
            <p>{`${startDay.format('dd, DD.MM.YYYY')} - ${endDay.format('dd, DD.MM.YYYY')}`}</p>
          </div>

          <div>
            <h5>Kwota</h5>
            <p>540,00zł</p>
          </div>

          {isCollapsed && (
            <>
              {companyName && (
                <div>
                  <h5>Nazwa firmy</h5>
                  <p>{companyName}</p>
                </div>
              )}

              {nip && (
                <div>
                  <h5>NIP</h5>
                  <p>{nip}</p>
                </div>
              )}

              {address.street && (
                <div>
                  <h5>Ulica</h5>
                  <p>{address.street}</p>
                </div>
              )}

              {address.postalCode && (
                <div>
                  <h5>Kod pocztowy</h5>
                  <p>{address.postalCode}</p>
                </div>
              )}

              {address.city && (
                <div>
                  <h5>Miasto</h5>
                  <p>{address.city}</p>
                </div>
              )}

              {address.discount && (
                <div>
                  <h5>Rabat</h5>
                  <p>{discount}</p>
                </div>
              )}
            </>
          )}
        </DetailsGrid>
        {isCollapsed && (
          <ProductsList>
            <h5>Produkty: </h5>
            {productList.map(([product], i) => (
              <ProductsListItem key={product._id}>
                <p>{`${i + 1}. ${product.productName}`}</p>
                <p>{`${product.price} zł`}</p>
              </ProductsListItem>
            ))}
          </ProductsList>
        )}
      </Details>
      <ButtonWrapper>
        <StyledMoreButton onClick={() => setOptionMenu(!optionMenu)} />
        <Button tertiary onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Zwiń' : 'Rozwiń'}
        </Button>
      </ButtonWrapper>
      <DropdownMenu top="60px" right="20px" isOpen={optionMenu}>
        <MenuItemList>
          <MenuItem as={Link} to={`${routes.rents}/${id}`}>
            Odbiór
          </MenuItem>
        </MenuItemList>
        <MenuItemList>
          <MenuItem onClick={createAndDownloadPdf} to={`${routes.rents}/${id}`}>
            Pobierz fakturę
          </MenuItem>
        </MenuItemList>
        <MenuItemList>
          <MenuItem as={Link} to={`${routes.rents}/${id}`}>
            Edytuj
          </MenuItem>
        </MenuItemList>
        <MenuItemList>
          <MenuItem onClick={handleDelete}>Anuluj</MenuItem>
        </MenuItemList>
      </DropdownMenu>
      {isModalOpen && <Modal title="Uwaga!" content="Czy na pewno chcesz usunąć pozycję?" setIsModalOpen={setIsModalOpen} confirmFn={onConfirm} />}
    </Wrapper>
  );
};

RentItem.propTypes = {
  id: PropTypes.string.isRequired,
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  dateOfRent: PropTypes.string.isRequired,
  dateOfReturn: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.string).isRequired,
};

RentItem.defaultProps = {};

export default RentItem;
