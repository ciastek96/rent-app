import styled from 'styled-components';

const ErrorParagraph = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  padding: 0 25px;
`;

export default ErrorParagraph;
