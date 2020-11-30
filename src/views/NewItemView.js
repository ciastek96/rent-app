import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import ClientForm from '../components/ClientForm/ClientForm';
import ProductForm from '../components/ProductForm/ProductForm';
import UserSettingsForm from '../components/UserSettingsForm/UserSettingsForm';
import Spinner from '../components/Spinner/Spinner';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import { routes } from '../routes/routes';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2::first-letter {
    text-transform: uppercase;
  }
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
  margin-bottom: 65px;
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

const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 45px;
`;

const NewItemView = ({ history, match: { path } }) => {
  const [pageType, setPageType] = useState('');

  const CLIENTS = 'klienci';
  const PRODUCTS = 'produkty';
  const SETTINGS = 'ustawienia';

  useEffect(() => {
    switch (path) {
      case routes.newClient:
        setPageType(CLIENTS);
        break;
      case routes.newProduct:
        setPageType(PRODUCTS);
        break;
      case routes.settings:
        setPageType(SETTINGS);
        break;
      default:
        break;
    }
  });

  switch (pageType) {
    case CLIENTS:
      return (
        <MainTemplate>
          <StyledHeader>
            <h2>{pageType}</h2>
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
              <ClientForm />
            </StyledGridWrapper>
          </StyledWrapper>
        </MainTemplate>
      );
    case PRODUCTS:
      return (
        <MainTemplate>
          <StyledHeader>
            <h2>{pageType}</h2>
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
              <ProductForm />
            </StyledGridWrapper>
          </StyledWrapper>
        </MainTemplate>
      );
    case SETTINGS:
      return (
        <MainTemplate>
          <StyledHeader>
            <h2>{pageType}</h2>
            <StyledButtonsWrapper>
              <Button
                secondary
                onClick={() => {
                  history.goBack(-1);
                }}
              >
                Anuluj
              </Button>
              <StyledButton>Zapisz</StyledButton>
            </StyledButtonsWrapper>
          </StyledHeader>
          <StyledWrapper>
            <StyledInnerWrapper>
              <ImageUploader />
              <StyledClientInfo>
                <h2>Kamil Kołacz</h2>
                <h4>Sikorskiego 21a, 44-120 Gliwice</h4>
                <span>
                  <h4>ciastek1996@gmail.com</h4>
                  <h4>+48 570 761 833</h4>
                </span>
              </StyledClientInfo>
            </StyledInnerWrapper>
            <StyledGridWrapper>
              <UserSettingsForm />
            </StyledGridWrapper>
          </StyledWrapper>
        </MainTemplate>
      );
    default:
      return (
        <MainTemplate>
          <Spinner />
        </MainTemplate>
      );
  }
};

NewItemView.propTypes = {
  history: PropTypes.string.isRequired,
  match: PropTypes.arrayOf(PropTypes.objects).isRequired,
  path: PropTypes.string.isRequired,
};

export default NewItemView;
