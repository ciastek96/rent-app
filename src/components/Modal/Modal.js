import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: hsla(0, 0%, 0%, 0.5); */
  z-index: 990;
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
  z-index: 999;

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

const ButtonWrapper = styled.div`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.default};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const MessageWrapper = styled.div`
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
    <Wrapper>
      <Modal>
        <MessageWrapper>
          <h2>Uwaga!</h2>
          <StyledParagraph>Czy na pewno chcesz usunąć pozycję?</StyledParagraph>
        </MessageWrapper>
        <ButtonWrapper>
          <Button secondary>Anuluj</Button>
          <Button>Usuń</Button>
        </ButtonWrapper>
      </Modal>
    </Wrapper>
  );
};

export default Modal;
