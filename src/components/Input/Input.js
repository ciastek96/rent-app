import styled, { css } from 'styled-components';
import SearchIcon from '../../assets/icons/svg/interfaces/search.svg';

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  padding: 12px 24px;

  ${({ search }) =>
    search &&
    css`
      background-image: url(${SearchIcon});
      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 12px 50%;
      padding: 12px 36px;
    `}
`;

export default Input;
