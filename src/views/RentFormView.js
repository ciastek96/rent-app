import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Select from 'react-select';
import Spinner from '../components/atoms/Spinner/Spinner';
import Input from '../components/atoms/Input/Input';
import ProductsCard from '../components/organisms/ProductsCard/ProductsCard';
import { addRent, updateRent } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import InnerTemplate from '../templates/InnerTemplate';
import Button from '../components/atoms/Button/Button';
import ErrorParagraph from '../components/atoms/ErrorParagraph/ErrorParagraph';
import ButtonsLayout from '../components/molecules/ButtonsLayout/ButtonsLayout';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import { getBrutto, getNetto, getDiscount, getVAT, getFinalPrice } from '../utils/getPrices';
import { routes } from '../routes/routes';

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const StyledForm = styled(Form)`
  padding-bottom: 45px;

  h4 {
    margin-top: 0;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 45px;

  @media (max-width: 620px) {
    grid-gap: 0;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledSelect = styled(Select)`
  font-size: 14px;
  margin: 0;
`;

const DateWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
    margin-bottom: 8px;
  }

  p {
    margin: 15px 0px;
  }
`;

const SelectWrapper = styled.div`
  padding: 15px 0;
`;

const Summary = styled.div`
  /* padding: 25px; */
  width: 100%;
  text-align: right;
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;

  @media (max-width: 620px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: left;
  text-align: right;
  padding: 7px 45px;

  p:first-child {
    color: ${({ theme }) => theme.lightGray};
    font-size: ${({ theme }) => theme.fontSize.xs};
    text-align: left;
  }

  p {
    font-weight: 500;
    margin-right: 15px;
  }

  &:last-child p {
    color: ${({ theme }) => theme.darkGray};
    font-size: ${({ theme }) => theme.fontSize.s};
  }

  &:last-child p:last-child {
    font-size: 24px;
    color: ${({ theme }) => theme.darkGray};
    font-weight: 600;
  }
`;

const RentFormView = ({ match, user: { userID } }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const productsList = useSelector((state) => state.product.products);
  const rents = useSelector((state) => state.rent);
  const rentValues = useSelector((state) => state.rent.rents.find((i) => i._id === id));
  const clientsList = useSelector((state) => state.client.clients);
  const isLoading = useSelector((state) => state.rent.loading);
  const [rentDuration, setRentDuration] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [rentValue, setRentValue] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);
  const isNewRent = id ? 0 : 1;

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

  if (isLoading) {
    return (
      <MainTemplate>
        <Spinner />
      </MainTemplate>
    );
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
        {rents?.loading && <Spinner />}
        {rents?.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
        {rents?.success && isMessageBoxOpen && <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />}
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
              setIsMessageBoxOpen(true);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <StyledForm id="newRentForm" autoComplete="new-password">
              <GridWrapper>
                <DateWrapper>
                  <p>Data wypożyczenia</p>

                  <DatePicker
                    selectsStart
                    selected={values.dateOfRent}
                    startDate={values.dateOfRent}
                    endDate={values.dateOfReturn}
                    // maxDate={values.dateOfRent}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                    name="dateOfRent"
                    onChange={(date) => {
                      setFieldValue('dateOfRent', date);
                      getRentDuration(date, values.dateOfReturn);
                    }}
                    customInput={<Field as={Input} />}
                  />
                  <ErrorMessage name="dateOfRent" component={ErrorParagraph} />
                </DateWrapper>

                <DateWrapper>
                  <p>Data oddania</p>
                  <DatePicker
                    selectsEnd
                    selected={values.dateOfReturn}
                    startDate={values.dateOfRent}
                    endDate={values.dateOfReturn}
                    minDate={values.dateOfRent}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                    name="dateOfReturn"
                    onChange={(date) => {
                      setFieldValue('dateOfReturn', date);
                      getRentDuration(values.dateOfRent, date);
                    }}
                    customInput={<Field as={Input} autoComplete="new-password" />}
                  />
                  <ErrorMessage name="dateOfReturn" component={ErrorParagraph} />
                </DateWrapper>
              </GridWrapper>

              <SelectWrapper>
                <StyledSelect
                  name="client"
                  placeholder="Wybierz klienta"
                  options={clientsList.map(({ name, surname, _id, ...clientValues }) => ({
                    value: `${name} ${surname}`,
                    label: `${name} ${surname}`,
                    _id,
                    ...clientValues,
                  }))}
                  onChange={(client) => setFieldValue('client', client)}
                />
                <ErrorMessage name="client" component={ErrorParagraph} />
              </SelectWrapper>

              {values.client && (
                <SelectWrapper>
                  <StyledSelect
                    isMulti
                    placeholder="Wybierz produkty"
                    name="products"
                    options={productsList.map(({ productName, _id, ...productValue }) => ({
                      value: productName,
                      label: productName,
                      productName,
                      _id,
                      qty: 1,
                      ...productValue,
                    }))}
                    // onChange={handleProduct}
                    // onChange={(products) => setFieldValue('products', products)}
                    onChange={(products) => {
                      setCartItems(products);
                      setFieldValue('products', products);
                    }}
                  />
                  <ErrorMessage name="products" component={ErrorParagraph} />
                </SelectWrapper>
              )}

              {values.products && values.products.length > 0 && (
                <>
                  <ProductsCard
                    values={values.products}
                    setRentValue={setRentValue}
                    rentValue={rentValue}
                    // onAdd={() => onAdd(cartItems, setFieldValue, values)}
                    setFieldValue={setFieldValue}
                    cartItems={cartItems}
                  />

                  <div>
                    <Field as={Input} label="Kaucja zwrotna" id="advance" name="advance" type="number" autoComplete="new-password" />
                    <ErrorMessage name="advance" component={ErrorParagraph} />
                  </div>

                  <Summary>
                    <SummaryItem>
                      <p>Ilość dni: </p>
                      <p>{rentDuration}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Kwota netto: </p>
                      <p>{`${getNetto(values.products, rentDuration)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Rabat [%] </p>
                      <p>{values.client.discount}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Podatek VAT</p>
                      <p>{` ${getVAT(values.products, rentDuration)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Rabat</p>
                      <p>{`${getDiscount(values, rentDuration)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Kwota brutto</p>
                      <p>{`${getBrutto(values.products, rentDuration)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Kaucja zwrotna</p>
                      <p>{`${values.advance} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Do zapłaty</p>
                      <p>{`${getFinalPrice(values, rentDuration)} zł`}</p>
                    </SummaryItem>
                  </Summary>
                </>
              )}
            </StyledForm>
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
