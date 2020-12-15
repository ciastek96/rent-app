import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import LayoutButtons from '../components/LayoutButtons/LayoutButtons';
import ListItem from '../components/ListItem/ListItem';

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemsTemplate = ({ children, title, value, handleChange, path }) => (
  <Wrapper>
    <Header>
      <h2>{title}</h2>
      <Input search value={value} placeholder="Szukaj..." onChange={handleChange} />
      <Button as={Link} to={path}>
        Dodaj nowy
      </Button>
    </Header>
    {children}
  </Wrapper>
);

ItemsTemplate.propTypes = {
  children: PropTypes.instanceOf(Array),
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  path: PropTypes.string.isRequired,
};

ItemsTemplate.defaultProps = {
  children: null,
  value: '',
  handleChange: '',
};

export default ItemsTemplate;
