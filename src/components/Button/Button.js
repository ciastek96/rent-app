import styled, { css } from 'styled-components';

const Button = styled.button`
  min-width: 120px;
  background-color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.default};
  border: 0;
  border-radius: 25px;
  padding: 9px 21px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.darkGreen};
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background: 0;
      color: #121212;
      text-decoration: underline;
      font-weight: 600;

      &:hover {
        background: ${({ theme }) => theme.white};
        color: black;
      }
    `}
`;

export default Button;
