import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import ImageUploader from '../components/ImageUploader/ImageUploader';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-left: 15px;
`;

const StyledWrapper = styled.div`
  max-width: 1024px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 45px;
`;

const StyledClientInfo = styled.div`
  margin-left: 45px;

  h2 {
    color: ${({ theme }) => theme.lightGray};
    margin-bottom: 0;
  }
`;

const StyledGridWrapper = styled.div`
  padding: 45px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const NewItemView = ({ history }) => (
  <MainTemplate>
    <StyledHeader>
      <h2>Klienci</h2>
      <StyledButtonsWrapper>
        <Button
          secondary
          onClick={() => {
            history.goBack(-1);
          }}
        >
          Anuluj
        </Button>
        <StyledButton>Dodaj</StyledButton>
      </StyledButtonsWrapper>
    </StyledHeader>
    <StyledWrapper>
      <StyledInnerWrapper>
        <ImageUploader />
        <StyledClientInfo>
          <h2>Adam Małysz</h2>
          <h4>Gliwice, Sikorskiego 21a</h4>
        </StyledClientInfo>
      </StyledInnerWrapper>
      <StyledGridWrapper>
        <Input label="Imię" id="name" type="text" autocomplete="off" required />
        <Input label="Nazwisko" id="surname" type="text" autocomplete="off" required />
        <Input label="Adres e-mail" id="email" type="email" autocomplete="off" required />
        <Input label="Telefon" id="phone" type="text" autocomplete="off" required />
        <Input label="NIP" id="nip" type="text" autocomplete="off" />
        <Input label="Miasto" id="city" type="text" />
        <Input label="Adres" id="address" type="text" />
        <Input label="Kod pocztowy" id="postalCode" type="text" />
        <Input label="Rabat" id="discount" type="number" min="0" max="100" value="0" />
      </StyledGridWrapper>
    </StyledWrapper>
  </MainTemplate>
);

NewItemView.propTypes = {
  history: PropTypes.string.isRequired,
};

export default NewItemView;