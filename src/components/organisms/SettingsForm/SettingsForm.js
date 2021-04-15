import React, { useContext } from 'react';
import styled from 'styled-components';
import { useFormikContext, Form } from 'formik';
import { Link } from 'react-router-dom';
import FileBase from 'react-file-base64';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import ErrorParagraph from '../../atoms/ErrorParagraph/ErrorParagraph';
import ImageUploader from '../../atoms/ImageUploader/ImageUploader';
import { routes } from '../../../routes/routes';
import { SettingsContext } from '../../../context/SettingsContext';

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 45px;

  @media (max-width: 720px) {
    flex-direction: column;
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

const PasswordContainer = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  padding: 0 0 65px 25px;
`;

const SettingsForm = () => {
  const { values } = useFormikContext();
  const { selectedFile, setSelectedFile, username, currentUser, Field, ErrorMessage } = useContext(SettingsContext);
  return (
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
      </StyledForm>
      <PasswordContainer>
        <h4>Zmiana hasła: </h4>
        <Button as={Link} to={routes.updatePassword} secondary="true">
          Zmień hasło
        </Button>
      </PasswordContainer>
    </>
  );
};

export default SettingsForm;
