import styled from 'styled-components';
import { BREAKPOINTS } from '../utils/constants';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;

  @media (max-width: ${BREAKPOINTS.lg}px) {
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
`;

function Section({ title, children, ...props }) {
  return (
    <StyledSection {...props}>
      {title && <Title>{title}</Title>}
      <Container>{children}</Container>
    </StyledSection>
  );
}

export default Section;
