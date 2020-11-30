import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button/Button';
import ClientForm from '../components/ClientForm/ClientForm';
import ProductForm from '../components/ProductForm/ProductForm';
import Spinner from '../components/Spinner/Spinner';
import ImageUploader from '../components/ImageUploader/ImageUploader';

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

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const NewItemView = ({ history, match: { path } }) => {
  const [pageType, setPageType] = useState('');

  const KLIENCI = 'klienci';

  useEffect(() => {
    const first = path.indexOf('/');
    const last = path.indexOf('/nowy');
    const url = path.slice(first + 1, last);
    setPageType(url);
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
          {pageType === KLIENCI ? <ClientForm /> : <ProductForm />}
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
