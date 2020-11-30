import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import ClientForm from '../components/ClientForm/ClientForm';
import ProductForm from '../components/ProductForm/ProductForm';
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
`;

const StyledGridWrapper = styled.div`
  padding: 45px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
      case routes.settings:
        setPageType(PRODUCTS);
        break;
      case routes.newProduct:
        setPageType(SETTINGS);
        break;
      default:
        break;
    }
  }, []);

  if (!pageType) {
    return (
      <MainTemplate>
        <Spinner />
      </MainTemplate>
    );
  }
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
          {pageType === CLIENTS ? <ClientForm /> : <ProductForm />}
        </StyledGridWrapper>
      </StyledWrapper>
    </MainTemplate>
  );
};

NewItemView.propTypes = {
  history: PropTypes.string.isRequired,
  match: PropTypes.arrayOf(PropTypes.objects).isRequired,
  path: PropTypes.string.isRequired,
};

export default NewItemView;
