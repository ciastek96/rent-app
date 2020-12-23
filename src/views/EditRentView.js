import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Select from 'react-select';
import Input from '../components/Input/Input';
import Spinner from '../components/Spinner/Spinner';
import ProductsCard from '../components/ProductsCard/ProductsCard';
import { getProducts, getClients, updateRent } from '../actions';
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
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledSelect = styled(Select)`
  margin: 0;
`;

const DateWrapper = styled.div`
  padding: 0 25px;

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

const EditRentView = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const currentRent = useSelector((state) => state.rents.find((rent) => rent._id === id));
  const productsList = useSelector((state) => state.products);
  const clientsList = useSelector((state) => state.clients);
  const history = useHistory();

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
            dispatch(updateRent(id, { ...values }));
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
                    onChange={(date) => setFieldValue('dateOfRent', date)}
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
                    onChange={(date) => setFieldValue('dateOfReturn', date)}
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
                  onChange={(products) => setFieldValue('products', products)}
                />
                <ErrorMessage name="products" component={Error} />
              </SelectWrapper>

              {values.products && values.products.length > 0 && <ProductsCard values={values.products} />}
            </StyledForm>
          )}
        </Formik>
      </Wrapper>
    </MainTemplate>
  );
};

export default EditRentView;
