import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
  justify-content: end;

  p {
    font-weight: 500;
  }
`;

const NewRentView = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const clientsList = useSelector((state) => state.clients);
  const [cartItems, setCartItems] = useState([]);
  const [rentValue, setRentValue] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x)));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
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
            dispatch(addRent({ ...values }));
            setRedirect(true);
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
                  onChange={(products) => setFieldValue('products', products)}
                />
                <ErrorMessage name="products" component={Error} />
              </SelectWrapper>

              <div>
                <Field as={Input} label="Zaliczka" id="advance" name="advance" type="number" autoComplete="new-password" />
                <ErrorMessage name="advance" component={Error} />
              </div>

              <div>
                <Field as={Textarea} label="Informacje dodatkowe" id="comments" name="comments" type="text" autoComplete="new-password" />
                <ErrorMessage name="comments" component={Error} />
              </div>

              {values.products && values.products.length > 0 && (
                <>
                  <ProductsCard values={values.products} setRentValue={setRentValue} rentValue={rentValue} onAdd={onAdd} />

                  <Summary>
                    <p>Łącznie netto: </p>
                    <p>VAT: </p>
                    <p>{`Łącznie brutto: ${rentValue}`}</p>
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
