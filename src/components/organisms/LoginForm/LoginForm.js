import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { routes } from '../../../routes/routes';
import { signIn } from '../../../actions';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Spinner from '../../atoms/Spinner/Spinner';
import MessageBox from '../../atoms/MessageBox/MessageBox';

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
  flex-direction: row-reverse;
  justify-content: space-around;
`;

const Error = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const LoginForm = ({ setCardType }) => {
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.users.loading);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const dispatch = useDispatch();
  let statusCode = 404;

  const renderMessageBox = (value = 'Wystąpił błąd. Spróbuj ponownie.') => <MessageBox type="error" value={value} setIsOpen={setIsMessageBoxOpen} />;

  const handleError = () => {
    switch (statusCode) {
      case '404':
        return renderMessageBox('Podane dane są nieprawidłowe');
      case '401':
        return renderMessageBox('Podane hasło jest nieprawidłowe');
      default:
        return renderMessageBox();
    }
  };

  if (users.error) {
    [statusCode] = users.error.message.split(' ').slice(-1);
  }

  return (
    <>
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
        onSubmit={(values) => {
          dispatch(signIn(values));
          setIsMessageBoxOpen(true);
        }}
      >
        {() => (
          <StyledForm>
            <Field as={StyledInput} type="text" name="username" placeholder="Nazwa użytkownika" />
            <ErrorMessage name="username" component={Error} />
            <Field as={StyledInput} type="password" name="password" placeholder="Hasło" />
            <ErrorMessage name="password" component={Error} />

            <ButtonsWrapper>
              <Button type="submit">Zaloguj</Button>
              <Button tertiary onClick={() => setCardType(routes.register)}>
                Rejestracja
              </Button>
            </ButtonsWrapper>
          </StyledForm>
        )}
      </Formik>
      {isLoading && <Spinner />}
      {users.error && isMessageBoxOpen && handleError()}
      {users.success && isMessageBoxOpen && <MessageBox type="success" value="Zostałeś pomyślnie zalogowany" setIsOpen={setIsMessageBoxOpen} />}
    </>
  );
};

LoginForm.propTypes = {
  setCardType: PropTypes.func.isRequired,
};

export default LoginForm;
