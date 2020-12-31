import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Select from 'react-select';
import Input from '../components/Input/Input';
import Textarea from '../components/Textarea/Textarea';
import ProductsCard from '../components/ProductsCard/ProductsCard';
import { addRent } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import { routes } from '../routes/routes';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2::first-letter {
    text-transform: uppercase;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 65px;
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
`;

const StyledSelect = styled(Select)`
  font-size: 14px;
  margin: 0;
`;

const DateWrapper = styled.div`
  padding: 0 25px;

  .react-datepicker-wrapper {
    width: 100%;
    margin-bottom: 8px;
  }

  p {
    margin: 15px 0px;
  }
`;

const SelectWrapper = styled.div`
  padding: 15px 25px;
`;

const Error = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  margin: 5px 0;
`;

const Summary = styled.div`
  padding: 25px;
  width: 100%;
  text-align: right;
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
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

const NewRentView = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const clientsList = useSelector((state) => state.clients);
  const [rentsDurr, setRentsDurr] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [rentValue, setRentValue] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const getNetto = (values) => {
    const netto = values
      .map((product) => (product.qty ? product.netto * product.qty : product.netto))
      .reduce((sum = 0, i) => sum + i)
      .toFixed(2);
    return (netto * rentsDurr).toFixed(2);
  };

  const getBrutto = (values) => {
    const brutto = values
      .map((product) => (product.qty ? product.brutto * product.qty : product.brutto))
      .reduce((sum = 0, i) => sum + i)
      .toFixed(2);
    return (brutto * rentsDurr).toFixed(2);
  };

  const getVAT = (values) => {
    const VAT = (getBrutto(values) - getNetto(values)).toFixed(2);
    return VAT;
  };

  const getDiscount = (values) => {
    const discount = (getBrutto(values.products) * (values.client.discount / 100)).toFixed(2);
    return discount;
  };

  const getFinalPrice = (values) => {
    const brutto = getBrutto(values.products);
    const price = (brutto - (brutto * values.client.discount) / 100).toFixed(2);
    return price;
  };

  const getRentsDurr = (dateOfRent, dateOfReturn) => {
    const firstDay = moment(dateOfRent);
    const lastDay = moment(dateOfReturn);

    const days = lastDay.diff(firstDay, 'days') + 1;
    setRentsDurr(days);
  };

  if (redirect) {
    return <Redirect to={routes.rents} />;
  }

  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Nowe wypożyczenie</h2>
        <ButtonsWrapper>
          <Button as={Link} to={routes.rents} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="newRentForm">
            Dodaj
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        <Formik
          initialValues={{
            dateOfRent: new Date(),
            dateOfReturn: '',
            products: [],
            client: null,
            brutto: 0,
            vat: 0,
            netto: 0,
            advance: 0,
            comments: '',
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

            if (!values.advance) {
              errors.advance = 'Uzupełnij pole.';
            }

            return errors;
          }}
          onSubmit={(values) => {
            const brutto = getBrutto(values.products);
            const netto = getNetto(values.products);
            const discount = getDiscount(values);
            const vat = getVAT(values.products);
            const price = getFinalPrice(values);
            console.log({ ...values, brutto, netto, vat, discount, price, rentsDurr });
            dispatch(addRent({ ...values, brutto, netto, vat, discount, price, rentsDurr }));
            // setRedirect(true);
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
                      getRentsDurr(date, values.dateOfReturn);
                    }}
                    customInput={<Field as={Input} />}
                  />
                  <ErrorMessage name="dateOfRent" component={Error} />
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
                      getRentsDurr(values.dateOfRent, date);
                    }}
                    customInput={<Field as={Input} autoComplete="new-password" />}
                  />
                  <ErrorMessage name="dateOfReturn" component={Error} />
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
                <ErrorMessage name="client" component={Error} />
              </SelectWrapper>

              <SelectWrapper>
                <StyledSelect
                  isMulti
                  placeholder="Wybierz produkty"
                  name="products"
                  options={productsList.map(({ productName, _id, ...productValue }) => ({
                    value: productName,
                    label: productName,
                    _id,
                    ...productValue,
                  }))}
                  // onChange={handleProduct}
                  // onChange={(products) => setFieldValue('products', products)}
                  onChange={(products) => {
                    setCartItems(products);
                    setFieldValue('products', products);
                  }}
                />
                <ErrorMessage name="products" component={Error} />
              </SelectWrapper>

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
                    <Field
                      as={Input}
                      label="Zaliczka"
                      id="advance"
                      name="advance"
                      type="number"
                      autoComplete="new-password"
                      max={getBrutto(values.products)}
                    />
                    <ErrorMessage name="advance" component={Error} />
                  </div>

                  <div>
                    <Field as={Textarea} label="Informacje dodatkowe" id="comments" name="comments" type="text" autoComplete="new-password" />
                    <ErrorMessage name="comments" component={Error} />
                  </div>

                  <Summary>
                    <SummaryItem>
                      <p>Ilość dni: </p>
                      <p>{rentsDurr}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Kwota netto: </p>
                      <p>{`${getNetto(values.products)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Rabat</p>
                      <p>{`${getDiscount(values)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Podatek VAT</p>
                      <p>{` ${getVAT(values.products)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Zaliczka</p>
                      <p>{`${values.advance.toFixed(2)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem>
                      <p>Kwota brutto</p>
                      <p>{`${getBrutto(values.products)} zł`}</p>
                    </SummaryItem>

                    <SummaryItem> </SummaryItem>

                    <SummaryItem>
                      <p>Do zapłaty</p>
                      <p>{`${getFinalPrice(values)} zł`}</p>
                    </SummaryItem>
                  </Summary>
                </>
              )}
            </StyledForm>
          )}
        </Formik>
      </Wrapper>
    </MainTemplate>
  );
};

export default NewRentView;
