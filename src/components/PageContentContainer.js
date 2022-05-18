import styled from 'styled-components';

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 60px;
`;

function PageContentContainer({ title, children }) {
  return (
    <main>
      <Title>{title}</Title>
      {children}
    </main>
  );
}

export default PageContentContainer;
