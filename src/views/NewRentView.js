import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import Input from '../components/Input/Input';
// import { addRent } from '../actions';
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

const ImageWrapper = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 45px;
`;

const StyledSelect = styled(Select)`
  margin: 0 25px;
  border-radius: 10px;
`;

const NewRentView = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const clientsList = useSelector((state) => state.clients);
  const [currentClient, setCurrentClient] = useState();
  const [redirect, setRedirect] = useState(false);

  const handleClient = (value) => {
    const selectedClient = clientsList.filter((client) => client._id === value._id);
    setCurrentClient(...selectedClient);
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
            firstDate: '',
            lastDate: '',
            products: [],
            clientId: '',
          }}
          validate={(values) => {
            const errors = {};

            return errors;
          }}
          onSubmit={(values) => {
            // console.log({ ...values, selectedFile });
            // dispatch(addClient({ ...values, selectedFile }));
            // setRedirect(true);
          }}
        >
          {({ values }) => (
            <>
              <StyledForm id="newRentForm">
                <div>
                  <Field as={Input} label="Data wypożyczenia" id="firstDate" name="firstDate" type="date" autoComplete="new-password" />
                  <ErrorMessage name="firstDate" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Data zwrotu" id="lastDate" name="lastDate" type="date" autoComplete="new-password" />
                  <ErrorMessage name="lastDate" component={Error} />
                </div>

                <div>
                  <StyledSelect
                    isMulti
                    name="products"
                    options={productsList.map(({ productName }) => ({ value: productName, label: productName }))}
                  />
                </div>

                <div>
                  <StyledSelect
                    name="clients"
                    options={clientsList.map(({ name, surname, _id }) => ({ value: `${name} ${surname}`, label: `${name} ${surname}`, _id }))}
                    onChange={handleClient}
                  />
                </div>

                {currentClient && (
                  <div>
                    <div>
                      <Field as={Input} label="Imię" id="name" name="name" type="text" />
                      <ErrorMessage name="name" component={Error} />
                    </div>
                    <div>
                      <Field as={Input} label="Nazwisko" id="surname" name="surname" type="text" />
                      <ErrorMessage name="surname" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="Adres e-mail" id="email" name="email" type="email" />
                      <ErrorMessage name="email" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="Telefon" id="phone" name="phone" type="text" />
                      <ErrorMessage name="phone" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="Nazwa firmy" id="companyName" name="companyName" type="text" autocomplete="off" />
                      <ErrorMessage name="companyName" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="NIP" id="nip" name="nip" type="text" autocomplete="off" />
                      <ErrorMessage name="nip" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="Miasto" id="city" name="address.city" type="text" />
                      <ErrorMessage name="address.city" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="Ulica" id="street" name="address.street" type="text" />
                      <ErrorMessage name="address.street" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="Kod pocztowy" id="postalCode" name="address.postalCode" type="text" />
                      <ErrorMessage name="address.postalCode" component={Error} />
                    </div>

                    <div>
                      <Field as={Input} label="Rabat" id="discount" name="discount" type="number" min="0" max="100" step="5" />
                      <ErrorMessage name="discount" component={Error} />
                    </div>
                  </div>
                )}
              </StyledForm>
            </>
          )}
        </Formik>
      </Wrapper>
    </MainTemplate>
  );
};

export default NewRentView;
