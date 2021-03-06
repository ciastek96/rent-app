import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  min-width: 120px;
  height: 36px;
  background-color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme, color }) => (color ? theme[color] : theme.default)};
  border: 0;
  border-radius: 25px;
  padding: 9px 21px;
  transition: background-color 0.2s ease-in-out;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.darkGreen};
  }

  &:focus {
    border: 0;
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background: ${({ theme }) => theme.gray};

      &:hover {
        background-color: ${({ theme }) => theme.darkGray};
      }
    `}

  ${({ tertiary }) =>
    tertiary &&
    css`
      background: 0;
      transition: color background-color 0.2s ease-in-out;
      color: ${({ theme, color }) => (color ? theme[color] : theme.darkGray)};
      text-decoration: underline;
      font-weight: 600;

      &:hover {
        background: ${({ theme }) => theme.white};
        color: ${({ theme }) => theme.darkGray};
      }
    `}
`;

export default Button;
