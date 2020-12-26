import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import FileBase from 'react-file-base64';
import Input from '../components/Input/Input';
import { getAccount, updateAccount } from '../actions';
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

const PasswordContainer = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  padding: 0 0 65px 25px;
`;

const SettingsView = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const PASS_VIEW = 'PASS_VIEW';
  const ACCOUNT_VIEW = 'ACCOUNT_VIEW';
  const currentUser = useSelector((state) => state.account.find((ac) => ac.userID === state.users.user.userID));
  const username = useSelector((state) => state.users.user.username);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!currentUser) {
    return (
      <MainTemplate>
        <Spinner />
      </MainTemplate>
    );
  }

  return (
    <MainTemplate>
      <StyledHeader>
        <h2>Ustawienia</h2>
        <ButtonsWrapper>
          <Button as={Link} to={routes.clients} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="settingsForm">
            Zapisz
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        <Formik
          initialValues={{
            name: currentUser.name || '',
            surname: currentUser.surname || '',
            email: currentUser.email || '',
            phone: currentUser.phone || 'phone',
            companyName: currentUser.companyName || '',
            nip: currentUser.nip || '',
            address: {
              city: currentUser.address ? currentUser.address.city : '',
              street: currentUser.address ? currentUser.address.street : '',
              postalCode: currentUser.address ? currentUser.address.postalCode : '',
            },
          }}
          validate={(values) => {
            const errors = {};

            if (values.name) {
              if (!values.name) {
                errors.name = 'Pole wymagane.';
              } else if (values.name.length < 3) {
                errors.name = 'Pole powinno zawierać minimum 3 znaki.';
              } else if (values.name.length > 16) {
                errors.name = 'Pole powinno zawierać maksimum 32 znaki.';
              }
            }

            if (values.surname) {
              if (values.surname.length < 3) {
                errors.surname = 'Pole powinno zawierać minimum 3 znaki.';
              } else if (values.surname.length > 16) {
                errors.surname = 'Pole powinno maksimum 16 znaki.';
              }
            }

            if (values.email) {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Podano adres e-mail jest niepoprawny.';
              }
            }

            if (values.phone) {
              if (
                !/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/g.test(values.phone)
              ) {
                errors.phone = 'Podany numer telefonu jest niepoprawny.';
              }
            }

            if (values.companyName) {
              if (values.companyName.length > 0 && values.companyName.length < 4) {
                errors.companyName = 'Pole powinno zawierać minimum 4 znaki.';
              }
            }

            if (values.nip) {
              if (!/^[0-9]{10}$/.test(values.nip)) {
                errors.nip = 'Podany NIP jest niepoprawny.';
              }
            }

            if (values.address.city) {
              if (/^[!^@#$%^&()_+{}|";<>?~`|*]+$/.test(values.address.city)) {
                errors.address.city = 'Podany miasto jest niepoprawny.';
              }
            }

            if (values.address.street) {
              if (/^[!^@#$%^&()_+{}|";<>?~`|*]+$/g.test(values.address.street)) {
                errors.address.street = 'Podany adres jest niepoprawny.';
              }
            }

            if (values.address.postalCode) {
              if (/^[!^@#$%^&()_+{}|";<>?~`|*]+$/.test(values.address.postalCode)) {
                errors.address.postalCode = 'Podany kod pocztowy jest niepoprawny.';
              }
            }

            return errors;
          }}
          onSubmit={(values) => {
            console.log(currentUser.userID, { ...values, selectedFile });
            dispatch(updateAccount(currentUser.userID, { ...values, selectedFile }));
            history.go(0);
          }}
        >
          {({ values }) => (
            <>
              <InnerWrapper>
                <ImageWrapper>
                  <ImageUploader image={!selectedFile ? currentUser.selectedFile : selectedFile} setSelectedFile={setSelectedFile} />
                  <FileBase type="file" id="image" multiple={false} accept="image/*" onDone={({ base64 }) => setSelectedFile(base64)} />
                </ImageWrapper>
                <ClientInfo>
                  <h2>{username}</h2>
                  <h4>{currentUser.email}</h4>
                </ClientInfo>
              </InnerWrapper>
              <StyledForm id="settingsForm">
                <div>
                  <Field as={Input} label="Imię" id="name" name="name" type="text" autoComplete="new-password" />
                  <ErrorMessage name="name" component={Error} />
                </div>
                <div>
                  <Field as={Input} label="Nazwisko" id="surname" name="surname" type="text" autoComplete="new-password" />
                  <ErrorMessage name="surname" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Adres e-mail" id="email" name="email" type="email" autoComplete="new-password" />
                  <ErrorMessage name="email" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Telefon" id="phone" name="phone" type="text" autoComplete="new-password" />
                  <ErrorMessage name="phone" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Nazwa firmy" id="companyName" name="companyName" type="text" autoComplete="new-password" />
                  <ErrorMessage name="companyName" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="NIP" id="nip" name="nip" type="text" autoComplete="new-password" />
                  <ErrorMessage name="nip" component={Error} />
                </div>
                <div>
                  <Field as={Input} label="Ulica" id="street" name="address.street" type="text" autoComplete="new-password" />
                  <ErrorMessage name="address.street" component={Error} />
                </div>
                <div>
                  <Field as={Input} label="Miasto" id="city" name="address.city" type="text" />
                  <ErrorMessage name="address.city" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Kod pocztowy" id="postalCode" name="address.postalCode" type="text" autoComplete="new-password" />
                  <ErrorMessage name="address.postalCode" component={Error} />
                </div>
              </StyledForm>
              <PasswordContainer>
                <h4>Zmiana hasła: </h4>
                <Button as={Link} to={routes.updatePassword} secondary="true">
                  Zmień hasło
                </Button>
              </PasswordContainer>
            </>
          )}
        </Formik>
      </Wrapper>
    </MainTemplate>
  );
};

export default SettingsView;
