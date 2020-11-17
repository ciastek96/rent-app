import styled from 'styled-components';

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  padding: 12px 24px;
`;

export default Input;
