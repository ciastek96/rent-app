import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { routes } from '../../routes/routes';
import MoreButton from '../MoreButton/MoreButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const StyledList = styled.div``;
const StyledListItem = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 10px 0;
  padding: 15px;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  grid-template-columns: 6% 92% 2%;
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
  margin: 0 0 0 25px;

  h4 {
    margin: 0;
  }
`;

const StyledButtonWrapper = styled.div``;

const StyledMenuItemList = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  margin: 0;
  padding: 12px 24px;

  &:hover {
    background-color: ${({ theme }) => theme.default};
  }
`;

const StyledDetails = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledDropdownMenu = styled(DropdownMenu)``;

const PRODUCTS = 'products';
const CLIENTS = 'clients';

const ListItem = ({ title, data, renter, name, phone, city, nip, listType }) => {
  const [optionMenu, setOptionMenu] = useState(false);
  return (
    <StyledList>
      <StyledListItem>
        {listType === PRODUCTS ? <StyledData>{data}</StyledData> : <StyledPhoto />}

        <StyledWrapper>
          {listType === PRODUCTS ? (
            <h4>{title}</h4>
          ) : (
            <>
              <h4>{name}</h4>
              <StyledDetails>
                <p>{city}</p>
                <p>{phone}</p>
              </StyledDetails>
            </>
          )}
        </StyledWrapper>
        <StyledButtonWrapper>
          {/* <Button color="lightGray" tertiary>
            Usuń pozycję
          </Button>
          <Button secondary>Edytuj</Button> */}
          <MoreButton onClick={() => setOptionMenu(!optionMenu)} />
        </StyledButtonWrapper>
        {optionMenu && (
          <>
            <StyledDropdownMenu top="50%">
              <StyledMenuItemList>
                <StyledLink to={routes.settings}>Usuń</StyledLink>
              </StyledMenuItemList>
              <StyledMenuItemList>
                <StyledLink to={routes.logout}>Edytuj</StyledLink>
              </StyledMenuItemList>
            </StyledDropdownMenu>
          </>
        )}
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
  nip: PropTypes.string,
  listType: PropTypes.oneOf([PRODUCTS, CLIENTS]),
};

ListItem.defaultProps = {
  title: null,
  data: null,
  renter: null,
  name: null,
  phone: null,
  city: null,
  nip: null,
  listType: PRODUCTS,
};

export default ListItem;
