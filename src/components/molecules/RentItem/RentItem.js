import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { finishRent, removeRent } from '../../../actions';
import Button from '../../atoms/Button/Button';
import Spinner from '../../atoms/Spinner/Spinner';
import DropdownMenu from '../../atoms/DropdownMenu/DropdownMenu';
import Modal from '../Modal/Modal';
import RentStatus from '../RentStatus/RentStatus';
import MoreButton from '../../atoms/MoreButton/MoreButton';
import { routes } from '../../../routes/routes';
import { getStatus } from '../../../utils/getStatus';
import { useDetectOutsideClick } from '../../../hooks/useDetectOutsideClick';

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

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

// const ButtonWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: right;
// `;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 0;
  }

  @media (max-width: 500px) {
    margin-top: 15px;
  }
`;

const StyledMoreButton = styled(MoreButton)`
  margin: 0 15px 0 auto;
  position: absolute;
  top: 22px;
  right: 0;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  word-wrap: break-word;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

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

// const ProductsListItem = styled.div``;

const DetailsWrapper = styled.div`
  padding-right: 12px;

  p {
    word-wrap: break-word;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 12px;
`;

const RentItem = ({
  values: {
    _id,
    // status,
    client: { label, companyName, email, phone, nip, address, discount: clientDiscount },
    dateOfRent,
    dateOfReturn,
    isFinished,
    products,
    price,
    brutto,
    netto,
    vat,
    discount,
    advance,
    rentDuration,
  },
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false);
  const currentUser = useSelector((state) => state.account);
  const [isRedirect, setIsRedirect] = useState(false);
  const td = moment().format('DD.MM.YYYY');
  const ref = useRef(null);
  useDetectOutsideClick(ref, setOptionMenu);

  const dispatch = useDispatch();

  const handleRemove = () => {
    setOptionMenu(false);
    setIsRemoveModalOpen(true);
  };

  const handleReturn = () => {
    setOptionMenu(false);
    setIsReturnModalOpen(true);
  };

  const onRemoveConfirm = () => {
    dispatch(removeRent(_id));
    setIsRemoveModalOpen(false);
  };

  const onReturnConfirm = () => {
    dispatch(finishRent(_id));
    setIsReturnModalOpen(false);
    setIsRedirect(true);
  };

  const createAndDownloadPdf = () => {
    setIsLoading(true);
    const api = 'https://my-rent-app.herokuapp.com';
    // const api = 'http://localhost:4000';

    const values = {
      currentUser,
      _id,
      client: { label, companyName, email, phone, nip, address, discount: clientDiscount },
      dateOfRent,
      dateOfReturn,
      isFinished,
      products,
      price,
      brutto,
      netto,
      vat,
      discount,
      advance,
      td,
      rentDuration,
    };

    axios
      .post(`${api}/create-pdf`, { values })
      .then(() => axios.get(`${api}/fetch-pdf`, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        setIsLoading(false);
        saveAs(pdfBlob, 'faktura.pdf');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const startDay = moment(dateOfRent);
  const endDay = moment(dateOfReturn);

  if (isRedirect) return <Redirect to={routes.finances} />;

  if (isLoading) {
    return <Spinner />;
  }

  const statusVal = getStatus(dateOfRent, dateOfReturn, isFinished);

  return (
    <Wrapper isCollapsed={isCollapsed} activeStatus={statusVal}>
      <StyledMoreButton onClick={() => setOptionMenu(!optionMenu)} ref={ref} />
      <StyledButton tertiary onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? 'Zwiń' : 'Rozwiń'}
      </StyledButton>
      <RentStatus status={isFinished ? 'finished' : statusVal} />
      <Details>
        <h2>{label}</h2>

        <DetailsGrid>
          <DetailsWrapper>
            <h5>Nr zamówienia</h5>
            <p>{_id}</p>
          </DetailsWrapper>

          <DetailsWrapper>
            <h5>Ilość produktów</h5>
            <p>{products.length}</p>
          </DetailsWrapper>

          <DetailsWrapper>
            <h5>Data wynajmu</h5>
            <p>{`${startDay.format('dd, DD.MM.YYYY')} - ${endDay.format('dd, DD.MM.YYYY')}`}</p>
          </DetailsWrapper>

          <DetailsWrapper>
            <h5>Rabat</h5>
            <p>{`${clientDiscount}%`}</p>
          </DetailsWrapper>

          <DetailsWrapper>
            <h5>Zaliczka</h5>
            <p>{`${parseFloat(advance).toFixed(2)} zł`}</p>
          </DetailsWrapper>

          <DetailsWrapper>
            <h5>Kwota</h5>
            <p>{`${price.toFixed(2)} zł`}</p>
          </DetailsWrapper>

          {isCollapsed && (
            <>
              {companyName && (
                <DetailsWrapper>
                  <h5>Nazwa firmy</h5>
                  <p>{companyName}</p>
                </DetailsWrapper>
              )}

              {nip && (
                <DetailsWrapper>
                  <h5>NIP</h5>
                  <p>{nip}</p>
                </DetailsWrapper>
              )}

              {address.street && (
                <DetailsWrapper>
                  <h5>Ulica</h5>
                  <p>{address.street}</p>
                </DetailsWrapper>
              )}

              {address.postalCode && (
                <DetailsWrapper>
                  <h5>Kod pocztowy</h5>
                  <p>{address.postalCode}</p>
                </DetailsWrapper>
              )}

              {address.city && (
                <DetailsWrapper>
                  <h5>Miasto</h5>
                  <p>{address.city}</p>
                </DetailsWrapper>
              )}

              {address.discount && (
                <DetailsWrapper>
                  <h5>Rabat</h5>
                  <p>{discount}</p>
                </DetailsWrapper>
              )}
            </>
          )}
        </DetailsGrid>
        {isCollapsed && (
          <ProductsList>
            <h5>Produkty: </h5>
            {products.map((product, i) => (
              <p key={product._id}>{`${i + 1}.  ${product.productName} x${product.qty}`}</p>
            ))}
            <br />
            <h5>Netto</h5>
            <p>{`${netto?.toFixed(2)} zł`}</p>
            <h5>VAT</h5>
            <p>{`${vat?.toFixed(2)} zł`}</p>
            <h5>Brutto</h5>
            <p>{`${brutto?.toFixed(2)} zł`}</p>
          </ProductsList>
        )}
      </Details>
      <DropdownMenu top="60px" right="20px" isOpen={optionMenu}>
        {isFinished ? (
          <MenuItemList>
            <MenuItem onClick={createAndDownloadPdf} to={`${routes.rents}/${_id}`}>
              Pobierz fakturę
            </MenuItem>
          </MenuItemList>
        ) : (
          <MenuItemList>
            <MenuItem onClick={handleReturn} to={`${routes.rents}/${_id}`}>
              Odbiór
            </MenuItem>
          </MenuItemList>
        )}

        {!isFinished && (
          <MenuItemList>
            <MenuItem as={Link} to={`${routes.rents}/${_id}`}>
              Edytuj
            </MenuItem>
          </MenuItemList>
        )}
        <MenuItemList>
          <MenuItem onClick={handleRemove}>{isFinished ? 'Usuń' : 'Anuluj'}</MenuItem>
        </MenuItemList>
      </DropdownMenu>

      {isReturnModalOpen && (
        <Modal
          title="Uwaga!"
          content="Czy na pewno chcesz zgłosić odbiór?"
          confirmButton="Zgłoś"
          setIsModalOpen={setIsReturnModalOpen}
          confirmFn={onReturnConfirm}
        />
      )}
      {isRemoveModalOpen && (
        <Modal
          title="Uwaga!"
          content={`Czy na pewno chcesz ${isFinished ? 'usunąć' : 'anulować'} wypożyczenie?`}
          confirmButton={isFinished ? 'Usuń' : 'Anuluj'}
          setIsModalOpen={setIsRemoveModalOpen}
          confirmFn={onRemoveConfirm}
        />
      )}
    </Wrapper>
  );
};

RentItem.propTypes = {
  values: PropTypes.shape({
    _id: PropTypes.string,
    client: PropTypes.shape({
      label: PropTypes.string,
      companyName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      nip: PropTypes.string,
      address: PropTypes.instanceOf(Object),
      discount: PropTypes.number,
    }),
    dateOfRent: PropTypes.string,
    dateOfReturn: PropTypes.string,
    isFinished: PropTypes.bool,
    products: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    price: PropTypes.number,
    brutto: PropTypes.number,
    netto: PropTypes.number,
    vat: PropTypes.number,
    discount: PropTypes.number,
    advance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rentDuration: PropTypes.number,
  }).isRequired,
};

export default RentItem;
