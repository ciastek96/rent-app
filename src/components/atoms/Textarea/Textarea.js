import React from 'react';
import styled, { css } from 'styled-components';
import { PropTypes } from 'prop-types';

const StyledTextarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 100px;
  max-height: 200px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  padding: 12px 24px;
  font-family: 'Montserrat', sans-serif;

  ${({ isCorrect }) =>
    isCorrect &&
    css`
      border: 1px solid ${({ theme }) => theme.green};
    `}
`;

const Wrapper = styled.div`
  padding: 12px 24px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  span {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const Textarea = ({ label, id, ...props }) => {
  if (label) {
    return (
      <Wrapper>
        <Label htmlFor={id}>
          <span>{label}</span>
        </Label>
        <StyledTextarea {...props} />
      </Wrapper>
    );
  }
  return <StyledTextarea {...props} />;
};

Textarea.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

Textarea.defaultProps = {
  label: null,
  id: null,
};

export default Textarea;
