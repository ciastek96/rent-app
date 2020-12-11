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

const Error = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const RegisterForm = ({ setCardType }) => (
  <Formik
    initialValues={{
      username: '',
      email: '',
      password: '',
      password2: '',
    }}
    validate={(values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Pole wymagane.';
      } else if (values.username.length <= 3 || values.username.length > 16) {
        errors.username = 'Pole powinno zawierać od 4 do 16 znaków.';
      } else if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim.test(values.username)) {
        errors.username = 'Dozwolono tylko małe i duże litery oraz cyfry.';
      }

      if (!values.email) {
        errors.email = 'Pole wymagane.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Podano nieprawidłowy adres e-mail.';
      }
      if (!values.password) {
        errors.password = 'Pole wymagane.';
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(
          values.password,
        )
      ) {
        errors.password =
          'Pole powinno zawierać minimum jedną małą i dużo literę, cyfrę i znak specjalny.';
      }
      if (!values.password2) {
        errors.password2 = 'Pole wymagane.';
      } else if (values.password !== values.password2) {
        errors.password2 = 'Podane hasła nie zą identyczne.';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
    }}
  >
    {({ isSubmitting }) => (
      <StyledForm>
        <Field
          as={StyledInput}
          type="text"
          name="username"
          placeholder="Nazwa użytkownika"
          autocomplete="off"
        />
        <ErrorMessage name="username" component={Error} />
        <Field
          as={StyledInput}
          type="text"
          name="email"
          placeholder="Adres e-mail"
          autocomplete="off"
        />
        <ErrorMessage name="email" component={Error} />
        <Field
          as={StyledInput}
          type="password"
          name="password"
          placeholder="Hasło"
          autocomplete="off"
        />
        <ErrorMessage name="password" component={Error} />
        <Field
          as={StyledInput}
          type="password"
          name="password2"
          placeholder="Powtórz hasło"
          autocomplete="off"
        />
        <ErrorMessage name="password2" component={Error} />
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
