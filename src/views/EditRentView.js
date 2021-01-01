import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import Input from '../components/Input/Input';
import Spinner from '../components/Spinner/Spinner';
import ProductsCard from '../components/ProductsCard/ProductsCard';
import { updateRent } from '../actions';
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
  padding: 25px;
`;

const StyledForm = styled(Form)`
  padding-bottom: 45px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 45px;
`;

const StyledSelect = styled(Select)`
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

const EditRentView = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const currentRent = useSelector((state) => state.rents.find((rent) => rent._id === id));
  const [rentsDurr, setRentsDurr] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [rentValue, setRentValue] = useState(0);
  const productsList = useSelector((state) => state.products);
  const clientsList = useSelector((state) => state.clients);
  const history = useHistory();

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

  if (!currentRent) {
    return (
      <MainTemplate>
        <Spinner />
      </MainTemplate>
    );
  }

  const [...currentProducts] = currentRent.products.map((product) => productsList.filter((products) => products._id === product));

  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Edytuj wypożyczenie</h2>
        <ButtonsWrapper>
          <Button as={Link} to={routes.rents} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="editRentForm">
            Dodaj
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        <Formik
          initialValues={{
            dateOfRent: new Date(currentRent.dateOfRent),
            dateOfReturn: new Date(currentRent.dateOfReturn),
            products: currentProducts.map(([product]) => product),
            client: currentRent.client,
            brutto: currentRent.brutto,
            vat: currentRent.vat,
            advance: currentRent.advance,
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

            // if (!values.client) {
            //   errors.client = 'Pole wymagane.';
            // }

            return errors;
          }}
          onSubmit={(values) => {
            const brutto = getBrutto(values.products);
            const netto = getNetto(values.products);
            const discount = getDiscount(values);
            const vat = getVAT(values.products);
            const price = getFinalPrice(values);
            console.log(id, { ...values, brutto, netto, vat, discount, price, rentsDurr });
            dispatch(updateRent(id, { ...values, brutto, netto, vat, discount, price, rentsDurr }));
            history.go(0);
          }}
        >
          {({ values, setFieldValue }) => (
            <StyledForm id="editRentForm" autoComplete="new-password">
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
                  // defaultValue={{ value: currentRent.client.value, label: currentRent.client.label }}
                  defaultValue={currentRent.client}
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

              {values.client && (
                <SelectWrapper>
                  <StyledSelect
                    isMulti
                    placeholder="Wybierz produkty"
                    name="products"
                    defaultValue={currentProducts.map(([{ productName, _id, ...productValue }]) => ({
                      value: productName,
                      label: productName,
                      _id,
                      ...productValue,
                    }))}
                    options={productsList.map(({ productName, _id, ...productValue }) => ({
                      value: productName,
                      label: productName,
                      _id,
                      ...productValue,
                    }))}
                    // onChange={handleProduct}
                    onChange={(products) => {
                      setCartItems(products);
                      setFieldValue('products', products);
                    }}
                  />
                  <ErrorMessage name="products" component={Error} />
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

                  {/* <div>
                    <Field as={Textarea} label="Informacje dodatkowe" id="comments" name="comments" type="text" autoComplete="new-password" />
                    <ErrorMessage name="comments" component={Error} />
                  </div> */}

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
                      <p>{`${values.advance} zł`}</p>
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

EditRentView.propTypes = {
  match: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
  params: PropTypes.oneOf([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired,
  id: PropTypes.string.isRequired,
};

export default EditRentView;
