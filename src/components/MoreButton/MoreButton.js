import styled from 'styled-components';
import { ReactComponent as MoreIcon } from '../../assets/icons/svg/interfaces/more-v.svg';

const MoreButton = styled(MoreIcon)`
  border: 0;
  height: 18px;
  width: 14px;
  background-color: white;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  fill: ${({ theme }) => theme.lightGray};
  transition: fill 0.25s linear;

  &:hover {
    fill: ${({ theme }) => theme.darkGray};
  }
`;

export default MoreButton;
