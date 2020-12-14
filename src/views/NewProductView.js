import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import { addProduct } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import ImageUploader from '../components/ImageUploader/ImageUploader';
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

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 45px;
`;

const ClientInfo = styled.div`
  margin-left: 45px;

  h2 {
    color: ${({ theme }) => theme.lightGray};
    margin-bottom: 0;
  }

  h4 {
    margin-right: 18px;
  }

  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Error = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  padding: 0 25px;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 45px;
`;

const NewProductView = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Nowy produkt</h2>
        <ButtonsWrapper>
          <Button as={Link} to={routes.products} secondary="true">
            Anuluj
          </Button>
          {/* <StyledButton onClick={() => dispatch(addClient(clientValues))}>Dodaj</StyledButton> */}
          <StyledButton type="submit" form="newProductForm">
            Dodaj
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        <Formik
          initialValues={{
            name: '',
            price: '',
            quantity: '',
            unit: 'szt',
            dateOfPurchase: '',
            dateOfLastInspection: '',
          }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = 'Pole wymagane.';
            } else if (values.name.length < 3) {
              errors.name = 'Pole powinno zawierać minimum 3 znaki.';
            } else if (values.name.length > 256) {
              errors.name = 'Pole powinno zawierać maksimum 256 znaki.';
            }

            if (!values.price) {
              errors.price = 'Pole wymagane.';
            } else if (!/^[0-9]+([.][0-9]+)?$/.test(values.price)) {
              errors.price = 'Podana cena jest niepoprawna.';
            }

            if (!values.quantity) {
              errors.quantity = 'Pole wymagane.';
            }

            if (!values.unit) {
              errors.unit = 'Pole wymagane.';
            }

            return errors;
          }}
          onSubmit={(values) => {
            console.log(values);
            dispatch(addProduct(values));
            // history.go(0);
          }}
        >
          {({ values }) => (
            <>
              <InnerWrapper>
                <ImageUploader />
                <ClientInfo>
                  <h2>{values.name ? values.name : '  '}</h2>
                  <h4>{values.price ? `${values.price} zł / doba` : null}</h4>
                </ClientInfo>
              </InnerWrapper>
              <StyledForm id="newProductForm">
                <div>
                  <Field as={Input} label="Nazwa" id="name" name="name" type="text" autoComplete="new-password" />
                  <ErrorMessage name="name" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Cena za dobę" id="price" name="price" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="price" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Ilość" id="quantity" name="quantity" type="number" min="0" autoComplete="new-password" />
                  <ErrorMessage name="quantity" component={Error} />
                </div>

                <div>
                  <Field as={Select} label="Jednostka" id="unit" name="unit">
                    <option value="szt">szt</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="m2">m2</option>
                    <option value="m3">m3</option>
                  </Field>
                  <ErrorMessage name="unit" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Data zakupu" id="dateOfPurchase" name="dateOfPurchase" type="date" />
                  <ErrorMessage name="dateOfPurchase" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Data ostatniego przeglądu" id="dateOfLastInspection" name="dateOfLastInspection" type="date" />
                  <ErrorMessage name="dateOfLastInspection" component={Error} />
                </div>
              </StyledForm>
            </>
          )}
        </Formik>
      </Wrapper>
    </MainTemplate>
  );
};

export default NewProductView;
