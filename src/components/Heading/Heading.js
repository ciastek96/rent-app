import React from 'react';
import { PropTypes } from 'prop-types';

const Heading = ({ children }) => <h2>{children}</h2>;

Heading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Heading;
