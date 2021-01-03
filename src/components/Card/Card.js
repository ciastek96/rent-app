import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeClient } from '../../actions';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Modal from '../Modal/Modal';
import MoreButton from '../MoreButton/MoreButton';
import { routes } from '../../routes/routes';
import { ReactComponent as PhoneIcon } from '../../assets/icons/svg/interfaces/phone.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/svg/interfaces/email.svg';

const Wrapper = styled.div`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.white};
  min-height: 420px;
  display: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: relative;

  &::before {
    content: '';
    height: 6px;
    width: 100%;
    background-color: ${({ theme }) => theme.green};
  }
`;

const StyledMoreButton = styled(MoreButton)`
  margin: 0 15px 0 auto;
`;

const Photo = styled.div`
  background-color: ${({ theme }) => theme.default};
  background-image: ${({ photo }) => (photo ? `url(${photo})` : 'none')};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  height: 225px;
  width: 225px;
  cursor: pointer;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 125px;
  background-color: ${({ theme }) => theme.default};
  text-align: center;
  padding: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  grid-gap: 15px;
`;

const InfoPosition = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSize.xs};
  align-items: center;
`;

const MenuItemList = styled.li`
  list-style: none;
`;

const MenuItem = styled.a`
  display: block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  margin: 0;
  padding: 12px 24px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.default};
  }
`;

const StyledPhoneIcon = styled(PhoneIcon)`
  width: 12px;
  fill: ${({ theme }) => theme.green};
  margin-right: 7px;
`;

const StyledEmailIcon = styled(EmailIcon)`
  width: 12px;
  fill: ${({ theme }) => theme.green};
  margin-right: 7px;
`;

const Card = ({ id, values: { name, surname, selectedFile, phone, email } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    setOptionMenu(false);
    setIsModalOpen(true);
  };

  const onConfirm = () => {
    dispatch(removeClient(id));
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>
        <StyledMoreButton onClick={() => setOptionMenu(!optionMenu)} />
        <Photo photo={selectedFile} as={Link} to={`${routes.clients}/${id}`} />
        <InnerWrapper>
          <h4>{`${name} ${surname}`}</h4>
          <Info>
            <InfoPosition>
              <StyledPhoneIcon />
              <p>{phone}</p>
            </InfoPosition>
            <InfoPosition>
              <StyledEmailIcon />
              <p>{email}</p>
            </InfoPosition>
          </Info>
        </InnerWrapper>
        <DropdownMenu top="50px" right="20px" isOpen={optionMenu}>
          <MenuItemList>
            <MenuItem onClick={handleDelete}>Usuń</MenuItem>
          </MenuItemList>
          <MenuItemList>
            <MenuItem as={Link} to={`${routes.clients}/${id}`}>
              Edytuj
            </MenuItem>
          </MenuItemList>
        </DropdownMenu>
      </Wrapper>
      {isModalOpen && <Modal title="Uwaga!" content="Czy na pewno chcesz usunąć pozycję?" setIsModalOpen={setIsModalOpen} confirmFn={onConfirm} />}
    </>
  );
};

Card.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    selectedFile: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
