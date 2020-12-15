import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import { updateProduct } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';
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

const EditClientView = ({ match }) => {
  const [productValues, setProductValues] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = match.params;

  useEffect(() => {
    axios
      .post('http://localhost:4000/products/product', {
        id,
      })
      .then((res) => setProductValues(res.data))
      .then(() => setIsLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }
  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Edytuj klienta</h2>
        <ButtonsWrapper>
          <Button as={Link} to={routes.products} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="newClientForm">
            Zatwierdź
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        <Formik
          initialValues={{
            productName: productValues.productName,
            price: productValues.price,
            quantity: productValues.quantity,
            unit: productValues.unity,
            dateOfPurchase: productValues.dateOfPurchase,
            dateOfLastInspection: productValues.dateOfLastInspection,
          }}
          validate={(values) => {
            const errors = {};

            if (!values.productName) {
              errors.productName = 'Pole wymagane.';
            } else if (values.productName.length < 4) {
              errors.productName = 'Pole powinno zawierać minimum 4 znaki.';
            } else if (values.productName.length > 256) {
              errors.productName = 'Pole powinno zawierać maksimum 256 znaków.';
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
            dispatch(updateProduct(id, values));
            history.go(0);
          }}
        >
          {({ values }) => (
            <>
              <InnerWrapper>
                <ImageUploader />
                <ClientInfo>
                  <h2>{productValues.productName}</h2>
                  <h4>{productValues.email}</h4>
                </ClientInfo>
              </InnerWrapper>
              <StyledForm id="newProductForm">
                <div>
                  <Field as={Input} label="Nazwa" id="productName" name="productName" type="text" autoComplete="new-password" />
                  <ErrorMessage name="productName" component={Error} />
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

EditClientView.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditClientView;
