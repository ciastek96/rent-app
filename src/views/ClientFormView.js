import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import FileBase from 'react-file-base64';
import Input from '../components/atoms/Input/Input';
import { addClient, updateClient } from '../actions';
import MainTemplate from '../templates/MainTemplate';
import ItemsTemplate from '../templates/ItemsTemplate';
import InnerTemplate from '../templates/InnerTemplate';
import Button from '../components/Button/Button';
import Spinner from '../components/atoms/Spinner/Spinner';
import ErrorParagraph from '../components/ErrorParagraph/ErrorParagraph';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import { routes } from '../routes/routes';

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 45px;

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 25px;
  }
`;

const ClientInfo = styled.div`
  margin-left: 45px;

  @media (max-width: 600px) {
    margin: 0;
  }

  h2 {
    color: ${({ theme }) => theme.lightGray};
    margin-bottom: 0;
    word-wrap: break-word;
  }

  h4 {
    margin-right: 18px;
    word-wrap: break-word;
  }

  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
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
  grid-gap: 0 45px;

  @media (max-width: 620px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ClientFormView = ({
  match: {
    params: { id },
  },
  user: { userID },
}) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState();
  const [redirect, setRedirect] = useState(false);
  const clients = useSelector((state) => state.client);
  const clientValues = useSelector((state) => state.client.clients.find((i) => i._id === id));
  const isNewClient = id ? 0 : 1;
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(true);

  if (id && !clientValues) {
    return (
      <MainTemplate>
        <Spinner />
      </MainTemplate>
    );
  }

  if (redirect) {
    return <Redirect to={routes.clients} />;
  }

  return (
    <MainTemplate>
      <ItemsTemplate title={isNewClient ? 'Nowy klient' : 'Edycja klienta'}>
        <Button as={Link} to={routes.clients} secondary="true">
          Anuluj
        </Button>
        <StyledButton type="submit" form="newClientForm">
          {isNewClient ? 'Dodaj' : 'Zapisz'}
        </StyledButton>
      </ItemsTemplate>
      <InnerTemplate>
        {clients?.loading && <Spinner />}
        {clients?.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
        {clients?.success && isMessageBoxOpen && (
          <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />
        )}
        <Formik
          initialValues={{
            name: clientValues?.name || '',
            surname: clientValues?.surname || '',
            email: clientValues?.email || '',
            phone: clientValues?.phone || '',
            companyName: clientValues?.companyName || '',
            nip: clientValues?.nip || '',
            address: {
              city: clientValues?.address?.city || '',
              street: clientValues?.address?.street || '',
              postalCode: clientValues?.address?.postalCode || '',
            },
            discount: clientValues?.discount || 0,
          }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = 'Pole wymagane.';
            } else if (values.name.length < 3) {
              errors.name = 'Pole powinno zawierać minimum 3 znaki.';
            } else if (values.name.length > 16) {
              errors.name = 'Pole powinno zawierać maksimum 32 znaki.';
            } else if (/[0-9!^@#$%^&()+{}|";<>?~`|*]/.test(values.name)) {
              errors.name = 'Użyto zabronionego znaku specjalnego.';
            }

            if (!values.surname) {
              errors.surname = 'Pole wymagane.';
            } else if (values.surname.length < 3) {
              errors.surname = 'Pole powinno zawierać minimum 3 znaki.';
            } else if (values.surname.length > 16) {
              errors.surname = 'Pole powinno maksimum 16 znaki.';
            } else if (/[0-9!^@#$%^&()+{}|";<>?~`|*]/.test(values.surname)) {
              errors.surname = 'Użyto zabronionego znaku specjalnego.';
            }

            if (!values.email) {
              errors.email = 'Pole wymagane.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Podano adres e-mail jest niepoprawny.';
            }

            if (!values.phone) {
              errors.phone = 'Pole wymagane.';
            } else if (
              !/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/g.test(values.phone)
            ) {
              errors.phone = 'Podany numer telefonu jest niepoprawny.';
            }

            if (values.companyName) {
              if (values.companyName.length > 0 && values.companyName.length < 4) {
                errors.companyName = 'Pole powinno zawierać minimum 4 znaki.';
              }
              if (/[!^@#$%^&()+{}|";<>?~`|*]/.test(values.companyName)) {
                errors.companyName = 'Użyto zabronionego znaku specjalnego.';
              }
            }

            if (values.nip) {
              if (!/^[0-9]{10}$/.test(values.nip)) {
                errors.nip = 'Podany NIP jest niepoprawny.';
              }
            }

            if (values.address.city) {
              if (/^[!^@#$%^&()_+{}|";<>?~`|*\s]+$/.test(values.address.city)) {
                if (!errors.address) errors.address = {};
                errors.address.city = 'Podane miasto jest niepoprawne.';
              }
            }

            if (values.address.street) {
              if (/^[!^@#$%^&()_+{}|";<>?~`|*\s]+$/g.test(values.address.street)) {
                if (!errors.address) errors.address = {};
                errors.address.street = 'Podany adres jest niepoprawny.';
              }
            }

            if (values.address.postalCode) {
              if (!/[0-9]{2}-[0-9]{3}$/.test(values.address.postalCode)) {
                if (!errors.address) errors.address = {};
                errors.address.postalCode = 'Podany kod pocztowy jest niepoprawny.';
              }
            }

            if (values.discount) {
              if (values.discount < 0) {
                errors.discount = 'Minimalna wartość rabatu to 0%';
              } else if (values.discount > 100) {
                errors.discount = 'Maksymalna wartość rabatu to 100%';
              } else if (!/\b([0-9]|[1-9][0-9]|100)\b/.test(values.discount)) {
                errors.discount = 'Podana wartość nie jest typu liczbowego.';
              }
            }

            return errors;
          }}
          onSubmit={(values) => {
            if (isNewClient) {
              dispatch(addClient({ userID, ...values, selectedFile }));
              setRedirect(true);
            } else {
              dispatch(updateClient(id, { userID, ...values, selectedFile }));
              setIsMessageBoxOpen(true);
            }
          }}
        >
          {({ values }) => (
            <>
              <InnerWrapper>
                <ImageWrapper>
                  <ImageUploader image={!selectedFile ? clientValues?.selectedFile : selectedFile} setSelectedFile={setSelectedFile} />
                  <FileBase type="file" id="image" multiple={false} accept="image/*" onDone={({ base64 }) => setSelectedFile(base64)} />
                </ImageWrapper>
                <ClientInfo>
                  <h2>{`${values.name} ${values.surname}`}</h2>
                  <h4>{values.email}</h4>
                </ClientInfo>
              </InnerWrapper>
              <StyledForm id="newClientForm">
                <div>
                  <Field as={Input} label="Imię" id="name" name="name" type="text" autoComplete="new-password" />
                  <ErrorMessage name="name" component={ErrorParagraph} />
                </div>
                <div>
                  <Field as={Input} label="Nazwisko" id="surname" name="surname" type="text" autoComplete="new-password" />
                  <ErrorMessage name="surname" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Adres e-mail" id="email" name="email" type="email" autoComplete="new-password" />
                  <ErrorMessage name="email" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Telefon" id="phone" name="phone" type="text" autoComplete="new-password" />
                  <ErrorMessage name="phone" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Nazwa firmy" id="companyName" name="companyName" type="text" autoComplete="new-password" />
                  <ErrorMessage name="companyName" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="NIP" id="nip" name="nip" type="text" autoComplete="new-password" />
                  <ErrorMessage name="nip" component={ErrorParagraph} />
                </div>
                <div>
                  <Field as={Input} label="Ulica" id="street" name="address.street" type="text" autoComplete="new-password" />
                  <ErrorMessage name="address.street" component={ErrorParagraph} />
                </div>
                <div>
                  <Field as={Input} label="Miasto" id="city" name="address.city" type="text" />
                  <ErrorMessage name="address.city" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Kod pocztowy" id="postalCode" name="address.postalCode" type="text" autoComplete="new-password" />
                  <ErrorMessage name="address.postalCode" component={ErrorParagraph} />
                </div>

                <div>
                  <Field as={Input} label="Rabat" id="discount" name="discount" type="number" min="0" max="100" />
                  <ErrorMessage name="discount" component={ErrorParagraph} />
                </div>
              </StyledForm>
            </>
          )}
        </Formik>
      </InnerTemplate>
    </MainTemplate>
  );
};

ClientFormView.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ClientFormView;
