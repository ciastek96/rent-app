import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { routes } from '../../routes/routes';
import { signIn } from '../../actions';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import MessageBox from '../MessageBox/MessageBox';

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

const Success = styled.p`
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const LoginForm = ({ setCardType }) => {
  // const error = useSelector((state) => state.users.error);
  // const success = useSelector((state) => state.users.success);
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.users.loading);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const dispatch = useDispatch();
  let statusCode = 404;

  const handleError = () => {
    switch (statusCode) {
      case '404':
        return <MessageBox type="error" value="Podane dane są nieprawidłowe" setIsOpen={setIsMessageBoxOpen} />;
      case '401':
        return <MessageBox type="error" value="Podane hasło jest nieprawidłowe" setIsOpen={setIsMessageBoxOpen} />;
      default:
        return <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />;
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
            {/* {error && <Error>{error}</Error>}
            {success && <Success>{success}</Success>} */}

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
