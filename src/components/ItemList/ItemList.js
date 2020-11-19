import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const produkty = [
  {
    title: 'Odkurzacz piorący Karcher k7',
    data: '05 Paź',
    renter: 'Jeam Beam',
  },
  {
    title: 'Wiertnica do betonu Dedra',
    data: '02 Paź',
    renter: 'Tomasz Hajto',
  },
  {
    title: 'Wiertarka Makita',
    data: '29 Wrz',
    renter: 'Jeam Beam',
  },
  {
    title: 'Szalunki systemowe',
    data: '20 Wrz',
    renter: 'Adam Małysz',
  },
];

const StyledList = styled.div``;
const StyledListItem = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 10px 0;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledPhoto = styled.div`
  height: 60px;
  width: 60px;
  background-color: ${({ theme }) => theme.green};
  border-radius: 50%;
`;

const StyledData = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: 0 5px;
  font-weight: 600;
  border-radius: 6px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.default};
`;

const StyledWrapper = styled.div`
  margin: 0 auto 0 25px;
`;

const StyledButtonWrapper = styled.div``;

const ItemList = () => (
  <StyledList>
    {produkty.map((item) => (
      <StyledListItem>
        {/* <StyledData>{item.data}</StyledData> */}
        <StyledPhoto />
        <StyledWrapper>
          <h4>{item.title}</h4>
        </StyledWrapper>
        <StyledButtonWrapper>
          <Button color="lightGray" tertiary>
            Usuń pozycję
          </Button>
          <Button>Edytuj</Button>
        </StyledButtonWrapper>
      </StyledListItem>
    ))}
  </StyledList>
);

export default ItemList;
