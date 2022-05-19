import styled from 'styled-components';

export const Text = styled.span`
  font-size: 14px;
  color: ${props => (props.type === 'weak' ? '#555' : 'black')};
  text-align: ${props => props.align};
`;

export const StrongText = styled(Text)`
  font-size: 18px;
  font-weight: 700;
`;
