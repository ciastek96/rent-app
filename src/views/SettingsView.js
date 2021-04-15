import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateAccount } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import InnerTemplate from '../templates/InnerTemplate';
import Button from '../components/atoms/Button/Button';
import ItemsTemplate from '../templates/ItemsTemplate';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import SettingsForm from '../components/organisms/SettingsForm/SettingsForm';
import { SettingsContext } from '../context/SettingsContext';

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const SettingsView = () => {
  const [selectedFile, setSelectedFile] = useState();
  const currentUser = useSelector((state) => state.account);
  const username = useSelector((state) => state.users.user.username);
  const dispatch = useDispatch();
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

  console.log(currentUser);

  return (
    <MainTemplate>
      <ItemsTemplate title="Ustawienia">
        <StyledButton type="submit" form="settingsForm">
          Zapisz
        </StyledButton>
      </ItemsTemplate>
      <InnerTemplate>
        <Formik
          initialValues={{
            name: currentUser.name,
            surname: currentUser.surname,
            email: currentUser.email,
            phone: currentUser.phone,
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
            dispatch(updateAccount({ ...values, selectedFile }));
            setIsMessageBoxOpen(true);
          }}
        >
          {({ values }) => (
            <SettingsContext.Provider value={{ values, selectedFile, setSelectedFile, username, currentUser, Form, Field, ErrorMessage }}>
              <SettingsForm />
            </SettingsContext.Provider>
          )}
        </Formik>
        {currentUser.error && isMessageBoxOpen && (
          <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />
        )}
        {currentUser.success && isMessageBoxOpen && (
          <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />
        )}
      </InnerTemplate>
    </MainTemplate>
  );
};

export default SettingsView;
