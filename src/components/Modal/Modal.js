import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: hsla(0, 0%, 0%, 0.5);
  z-index: 999;
`;

const StyledModal = styled.div`
  width: 380px;
  height: 250px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:before {
    content: '';
    height: 6px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.green};
  }
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.default};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledMessageWrapper = styled.div`
  text-align: center;
  height: 100%;
  width: 60%;
  padding-top: 15px;
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.lightGray};
  margin-bottom: 15%;
`;

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState();
  return (
    <StyledWrapper onClick={() => setIsModalOpen(false)}>
      <StyledModal>
        <StyledMessageWrapper>
          <h2>Uwaga!</h2>
          <StyledParagraph>Czy na pewno chcesz odrzucić zapisywanie zmian?</StyledParagraph>
        </StyledMessageWrapper>
        <StyledButtonWrapper>
          <Button secondary>Anuluj</Button>
          <Button onClick={() => setIsModalOpen(false)}>Usuń</Button>
        </StyledButtonWrapper>
      </StyledModal>
    </StyledWrapper>
  );
};

export default Modal;
