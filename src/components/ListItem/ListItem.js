import React, { useState } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Button from '../Button/Button';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import MoreIcon from '../../assets/icons/svg/interfaces/more-v.svg';

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
  position: relative;
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

const StyledMoreButton = styled.button`
  border: 0;
  height: 18px;
  width: 14px;
  background-color: white;
  background-image: url(${MoreIcon});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const PRODUCTS = 'products';
const CLIENTS = 'clients';

const ListItem = ({ title, data, renter, name, phone, city, listType }) => {
  const [optionMenu, setOptionMenu] = useState(false);
  return (
    <StyledList>
      <StyledListItem>
        {/* <StyledData>{item.data}</StyledData> */}
        <StyledPhoto />
        <StyledWrapper>
          {listType === PRODUCTS ? <h4>{title}</h4> : <h4>{name}</h4>}
          {listType === CLIENTS && (
            <>
              <p>{city}</p>
            </>
          )}
        </StyledWrapper>
        <StyledButtonWrapper>
          {/* <Button color="lightGray" tertiary>
            Usuń pozycję
          </Button>
          <Button secondary>Edytuj</Button> */}
          <StyledMoreButton onClick={() => setOptionMenu(!optionMenu)} />
        </StyledButtonWrapper>
        {optionMenu && <DropdownMenu />}
      </StyledListItem>
    </StyledList>
  );
};

ListItem.propTypes = {
  title: PropTypes.string,
  data: PropTypes.string,
  renter: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  city: PropTypes.string,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
};

ListItem.defaultProps = {
  title: null,
  data: null,
  renter: null,
  name: null,
  phone: null,
  city: null,
  listType: PRODUCTS,
};

export default ListItem;
