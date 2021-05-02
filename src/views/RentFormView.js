import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RentForm from '../components/organisms/RentForm/RentForm';
import { addRent, updateRent } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import InnerTemplate from '../templates/InnerTemplate';
import Button from '../components/atoms/Button/Button';
import ButtonsLayout from '../components/molecules/ButtonsLayout/ButtonsLayout';
import { getBrutto, getNetto, getDiscount, getVAT, getFinalPrice } from '../utils/getPrices';
import { routes } from '../routes/routes';
import { RentContext } from '../context/RentContext';

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const RentFormView = ({ match, user: { userID } }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const productsList = useSelector((state) => state.product.products);
  const rentValues = useSelector((state) => state.rent.rents.find((i) => i._id === id));
  const clientsList = useSelector((state) => state.client.clients);

  const [rentDuration, setRentDuration] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [rentValue, setRentValue] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const isNewRent = !id;

  const currentProducts = rentValues?.products.map((product) => product);

  const getRentDuration = (dateOfRent, dateOfReturn) => {
    const firstDay = moment(dateOfRent);
    const lastDay = moment(dateOfReturn);

    const days = lastDay.diff(firstDay, 'days') + 1;
    setRentDuration(days);
  };

  if (redirect) {
    return <Redirect to={routes.rents} />;
  }

  return (
    <MainTemplate>
      <ItemsTemplate title={isNewRent ? 'Nowe wypożyczenie' : 'Edycja wypożyczenia'}>
        <ButtonsLayout>
          <Button as={Link} to={routes.rents} secondary="true">
            Cofnij
          </Button>
          <StyledButton type="submit" form="newRentForm">
            {isNewRent ? 'Dodaj' : 'Zapisz'}
          </StyledButton>
        </ButtonsLayout>
      </ItemsTemplate>
      <InnerTemplate>
        <Formik
          initialValues={{
            dateOfRent: rentValues?.dateOfRent && rentValues?.dateOfRent !== null ? new Date(rentValues.dateOfRent) : new Date(),
            dateOfReturn: rentValues?.dateOfReturn && rentValues?.dateOfReturn !== null ? new Date(rentValues.dateOfReturn) : new Date(),
            products: currentProducts?.map((product) => product) || [],
            client: rentValues?.client || null,
            brutto: rentValues?.brutto || 0,
            vat: rentValues?.brutto || 0,
            netto: rentValues?.netto || 0,
            advance: rentValues?.advance || 0,
            comments: rentValues?.comments || '',
          }}
          validate={(values) => {
            const errors = {};

            if (!values.dateOfRent) {
              errors.dateOfRent = 'Pole wymagane.';
            }

            if (!values.dateOfReturn) {
              errors.dateOfReturn = 'Pole wymagane.';
            }

            if (values.products) {
              if (!values.products.length > 0) {
                errors.products = 'Pole wymagane.';
              }
            }

            if (!values.client) {
              errors.client = 'Pole wymagane.';
            }

            return errors;
          }}
          onSubmit={(values) => {
            const brutto = getBrutto(values.products, rentDuration);
            const netto = getNetto(values.products, rentDuration);
            const discount = getDiscount(values, rentDuration);
            const vat = getVAT(values.products, rentDuration);
            const price = getFinalPrice(values, rentDuration);
            if (isNewRent) {
              dispatch(addRent({ userID, ...values, brutto, netto, vat, discount, price, rentDuration }));
              setRedirect(true);
            } else {
              dispatch(updateRent(id, { userID, ...values, brutto, netto, vat, discount, price, rentDuration }));
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <RentContext.Provider
              value={{
                values,
                productsList,
                rentValues,
                clientsList,
                rentDuration,
                setRentDuration,
                getRentDuration,
                cartItems,
                setCartItems,
                rentValue,
                setRentValue,
                setFieldValue,
              }}
            >
              <RentForm />
            </RentContext.Provider>
          )}
        </Formik>
      </InnerTemplate>
    </MainTemplate>
  );
};

RentFormView.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RentFormView;
