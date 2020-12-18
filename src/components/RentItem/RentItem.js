import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { removeRent } from '../../actions';
import { routes } from '../../routes/routes';
import Button from '../Button/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 10px;
  background: ${({ theme }) => theme.white};
  margin: 15px 0;
  padding: 45px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const RentItem = ({ id, client: { label }, dateOfRent, dateOfReturn, isFinished }) => {
  const dispatch = useDispatch();

  const startDay = new Date(dateOfRent).toISOString().slice(0, 10);
  const endDay = new Date(dateOfReturn).toISOString().slice(0, 10);
  return (
    <Wrapper>
      <h3>{`Najemca: ${label}`}</h3>
      <p>
        Statuts:
        {isFinished ? ' Zakończono' : ' Trwające'}
      </p>
      <p>{`Data wypożyczenia: ${startDay}`}</p>
      <p>{`Data oddania: ${endDay}`}</p>
      <ButtonWrapper>
        <Button secondary>Więcej</Button>
        <Button>Zakończ</Button>
        <Button onClick={() => dispatch(removeRent(id))}>Usuń</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

RentItem.propTypes = {
  id: PropTypes.string.isRequired,
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  dateOfRent: PropTypes.string.isRequired,
  dateOfReturn: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired,
};

RentItem.defaultProps = {};

export default RentItem;
