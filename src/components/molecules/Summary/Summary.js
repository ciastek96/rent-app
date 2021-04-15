import React, { useContext } from 'react';
import styled from 'styled-components';
import { getBrutto, getNetto, getDiscount, getVAT, getFinalPrice } from '../../../utils/getPrices';
import { RentContext } from '../../../context/RentContext';

const SummaryWrapper = styled.div`
  /* padding: 25px; */
  width: 100%;
  text-align: right;
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;

  @media (max-width: 620px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: left;
  text-align: right;
  padding: 7px 45px;

  p:first-child {
    color: ${({ theme }) => theme.lightGray};
    font-size: ${({ theme }) => theme.fontSize.xs};
    text-align: left;
  }

  p {
    font-weight: 500;
    margin-right: 15px;
  }

  &:last-child p {
    color: ${({ theme }) => theme.darkGray};
    font-size: ${({ theme }) => theme.fontSize.s};
  }

  &:last-child p:last-child {
    font-size: 24px;
    color: ${({ theme }) => theme.darkGray};
    font-weight: 600;
  }
`;

const Summary = () => {
  const { values, rentDuration } = useContext(RentContext);

  return (
    <SummaryWrapper>
      <SummaryItem>
        <p>Ilość dni: </p>
        <p>{rentDuration}</p>
      </SummaryItem>

      <SummaryItem>
        <p>Kwota netto: </p>
        <p>{`${getNetto(values?.products, rentDuration)} zł`}</p>
      </SummaryItem>

      <SummaryItem>
        <p>Rabat [%] </p>
        <p>{values?.client?.discount}</p>
      </SummaryItem>

      <SummaryItem>
        <p>Podatek VAT</p>
        <p>{` ${getVAT(values?.products, rentDuration)} zł`}</p>
      </SummaryItem>

      <SummaryItem>
        <p>Rabat</p>
        <p>{`${getDiscount(values, rentDuration)} zł`}</p>
      </SummaryItem>

      <SummaryItem>
        <p>Kwota brutto</p>
        <p>{`${getBrutto(values?.products, rentDuration)} zł`}</p>
      </SummaryItem>

      <SummaryItem>
        <p>Kaucja zwrotna</p>
        <p>{`${values?.advance} zł`}</p>
      </SummaryItem>

      <SummaryItem>
        <p>Do zapłaty</p>
        <p>{`${getFinalPrice(values, rentDuration)} zł`}</p>
      </SummaryItem>
    </SummaryWrapper>
  );
};

export default Summary;
