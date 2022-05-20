import styled from 'styled-components';

const Container = styled.main`
  width: 100%;
`;

const TitleContainer = styled.header`
  display: flex;
  align-items: flex-end;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-right: 16px;
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: #555;
`;

function PageContentContainer({ title, subTitle, children }) {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </TitleContainer>
      {children}
    </Container>
  );
}

export default PageContentContainer;
