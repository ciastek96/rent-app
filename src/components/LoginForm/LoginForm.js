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

const LoginForm = ({ setCardType }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validate={(values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Pole wymagane';
      }
      if (!values.password) {
        errors.password = 'Pole wymagane';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <StyledForm>
        <StyledInput type="text" name="username" placeholder="Nazwa użytkownika" />
        <ErrorMessage name="username" component="div" />
        <StyledInput type="password" name="password" placeholder="Hasło" />
        <ErrorMessage name="password" component="div" />
        <ButtonsWrapper>
          <Button tertiary onClick={() => setCardType(routes.register)}>
            Rejestracja
          </Button>
          <Button type="submit" isDisabled={isSubmitting}>
            Zaloguj
          </Button>
        </ButtonsWrapper>
      </StyledForm>
    )}
  </Formik>
);

LoginForm.propTypes = {
  setCardType: PropTypes.func.isRequired,
};

export default LoginForm;
