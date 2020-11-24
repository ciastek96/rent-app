import styled, { css } from 'styled-components';
import MoreIcon from '../../assets/icons/svg/interfaces/more-v.svg';

const Button = styled.button`
  min-width: 120px;
  height: 36px;
  background-color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme, color }) => (color ? theme[color] : theme.default)};
  border: 0;
  border-radius: 25px;
  padding: 9px 21px;
  transition: background-color 0.2s ease-in-out;
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
