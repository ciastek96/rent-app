import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeClient, removeProduct } from '../../../actions';
import ListDropdown from './ListDropdown';
import ToggleModal from '../../../providers/ToggleModal';
import Modal from '../../molecules/Modal/Modal';

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

const Title = styled.div`
  text-align: left;
  p {
    margin-top: 5px;
  }
`;

const PRODUCTS = 'products';
const CLIENTS = 'clients';

const ListItem = ({ listType, id, values }) => {
  const dispatch = useDispatch();
  const { name, surname, selectedFile, productName, email, phone, discount, brutto, quantity, unit } = values;

  const handleDelete = (setIsModalOpen) => {
    setIsModalOpen(true);
  };

  const onConfirm = (setIsModalOpen) => {
    if (listType === PRODUCTS) dispatch(removeProduct(id));
    else dispatch(removeClient(id));
    setIsModalOpen(false);
  };

  return (
    <ToggleModal
      render={({ isModalOpen, setIsModalOpen }) => (
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
                <p>{`${brutto.toFixed(2)} zł`}</p>
              </>
            ) : (
              <>
                <p>{phone}</p>
                <p>{`${discount}%`}</p>
              </>
            )}
            <ListDropdown id={id} listType={listType} setIsModalOpen={setIsModalOpen} handleDelete={handleDelete} />
          </ListItemWrapper>
          {isModalOpen && (
            <Modal
              title="Uwaga!"
              content="Czy na pewno chcesz usunąć pozycję?"
              setIsModalOpen={setIsModalOpen}
              confirmFn={() => onConfirm(setIsModalOpen)}
            />
          )}
        </>
      )}
    />
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
    discount: PropTypes.number,
    price: PropTypes.number,
    quantity: PropTypes.string,
    unit: PropTypes.string,
    brutto: PropTypes.number,
    netto: PropTypes.number,
    vat: PropTypes.number,
  }),
  id: PropTypes.string.isRequired,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
};

ListItem.defaultProps = {
  values: {},
  listType: PRODUCTS,
};

export default ListItem;
