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

const UpdatePasswordView = () => {
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
        <h2>Zmiana hasła</h2>
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

            return errors;
          }}
          onSubmit={(values) => {
            console.log(values);
            // dispatch(updateAccount(currentUser.userID, { ...values, selectedFile }));
            // history.go(0);
          }}
        >
          {({ values }) => (
            <>
              <StyledForm id="settingsForm">
                <div>
                  <Field as={Input} label="Imię" id="name" name="name" type="text" autoComplete="new-password" />
                  <ErrorMessage name="name" component={Error} />
                </div>
                <div>
                  <Field as={Input} label="Nazwisko" id="surname" name="surname" type="text" autoComplete="new-password" />
                  <ErrorMessage name="surname" component={Error} />
                </div>
              </StyledForm>
            </>
          )}
        </Formik>
      </Wrapper>
    </MainTemplate>
  );
};

export default UpdatePasswordView;
