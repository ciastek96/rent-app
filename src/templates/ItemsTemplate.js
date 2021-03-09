import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import ButtonsLayout from '../components/ButtonsLayout/ButtonsLayout';
import Input from '../components/Input/Input';

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ItemsTemplate = ({ children, title, value, handleChange, path }) => (
  <Wrapper>
    <Header>
      <h2>{title}</h2>
      {handleChange && <Input search value={value} placeholder="Szukaj..." onChange={handleChange} />}
      {path && (
        <Button as={Link} to={path}>
          Dodaj
        </Button>
      )}
      {children && <ButtonsLayout>{children}</ButtonsLayout>}
    </Header>
  </Wrapper>
);

ItemsTemplate.propTypes = {
  children: PropTypes.instanceOf(Array),
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  path: PropTypes.string,
};

ItemsTemplate.defaultProps = {
  children: null,
  value: '',
  handleChange: null,
  path: null,
};

export default ItemsTemplate;
