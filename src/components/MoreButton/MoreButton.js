import styled from 'styled-components';
import MoreIcon from '../../assets/icons/svg/interfaces/more-v.svg';

const MoreButton = styled.button`
  border: 0;
  height: 18px;
  width: 14px;
  background-color: white;
  background-image: url(${MoreIcon});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export default MoreButton;
