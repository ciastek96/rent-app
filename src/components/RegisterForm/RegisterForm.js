import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { routes } from '../../routes/routes';
import Input from '../Input/Input';
import Button from '../Button/Button';

const StyledForm = styled(Form)`
  min-width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 5px 0;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  margin-top: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const RegisterForm = ({ setCardType }) => (
  <Formik
    initialValues={{
      username: '',
      email: '',
      password: '',
      oassword2: '',
    }}
    validate={(values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Pole wymagane';
      }
      if (!values.email) {
        errors.email = 'Pole wymagane';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid Email address';
      }
      if (!values.password) {
        errors.password = 'Pole wymagane';
      }
      if (!values.password2) {
        errors.password2 = 'Pole wymagane';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
    }}
  >
    {({ isSubmitting }) => (
      <StyledForm>
        <StyledInput type="text" name="username" placeholder="Nazwa użytkownika" />
        <ErrorMessage name="username" component="div" />
        <StyledInput type="text" name="email" placeholder="Adres e-mail" />
        <ErrorMessage name="email" component="div" />
        <StyledInput type="password" name="password" placeholder="Hasło" />
        <ErrorMessage name="password" component="div" />
        <StyledInput type="password" name="password2" placeholder="Powtórz hasło" />
        <ErrorMessage name="password2" component="div" />
        <ButtonsWrapper>
          <Button tertiary onClick={() => setCardType(routes.login)}>
            Logowanie
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Stwórz konto
          </Button>
        </ButtonsWrapper>
      </StyledForm>
    )}
  </Formik>
);

RegisterForm.propTypes = {
  setCardType: PropTypes.func.isRequired,
};

export default RegisterForm;
