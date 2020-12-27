import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';
import { routes } from '../routes/routes';
import { updatePassword } from '../actions';

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

const UpdatePasswordView = () => {
  const currentUser = useSelector((state) => state.account.find((ac) => ac.userID === state.users.user.userID));
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

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
          <Button as={Link} to={routes.settings} secondary="true">
            Anuluj
          </Button>
          <StyledButton type="submit" form="newPasswordForm">
            Zapisz
          </StyledButton>
        </ButtonsWrapper>
      </StyledHeader>
      <Wrapper>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            newPassword2: '',
          }}
          validate={(values) => {
            const errors = {};

            if (!values.currentPassword) {
              errors.currentPassword = 'Pole wymagane.';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(values.currentPassword)) {
              errors.currentPassword = 'Pole powinno zawierać minimum jedną małą i dużą literę, cyfrę i znak specjalny.';
            }

            if (!values.newPassword) {
              errors.newPassword = 'Pole wymagane.';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(values.newPassword)) {
              errors.newPassword = 'Pole powinno zawierać minimum jedną małą i dużą literę, cyfrę i znak specjalny.';
            }
            if (!values.newPassword2) {
              errors.newPassword2 = 'Pole wymagane.';
            } else if (values.newPassword !== values.newPassword2) {
              errors.newPassword2 = 'Podane hasła nie zą identyczne.';
            }

            return errors;
          }}
          onSubmit={(values) => {
            dispatch(updatePassword(user.userID, values));
          }}
        >
          {() => (
            <>
              <StyledForm id="newPasswordForm">
                <div>
                  <Field as={Input} label="Aktualne hasło" id="currentPassword" name="currentPassword" type="password" autoComplete="new-password" />
                  <ErrorMessage name="currentPassword" component={Error} />
                </div>
                <div>
                  <Field as={Input} label="Nowe hasło" id="newPassword" name="newPassword" type="password" autoComplete="new-password" />
                  <ErrorMessage name="newPassword" component={Error} />
                </div>

                <div>
                  <Field as={Input} label="Powtórz nowe hasło" id="newPassword2" name="newPassword2" type="password" autoComplete="new-password" />
                  <ErrorMessage name="newPassword2" component={Error} />
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
