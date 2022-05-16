import styled from 'styled-components';

const Container = styled.main`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 60px;
`;

function PageContentContainer({ title, children }) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}

export default PageContentContainer;
