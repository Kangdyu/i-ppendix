import styled from 'styled-components';

const PADDING = 20;

const Container = styled.div`
  max-height: 500px;
  min-height: 500px;
  height: 100%;
  overflow-y: scroll;
  padding: ${PADDING}px 0;
  border-radius: 16px;
  border: 1px solid #dbdbdb;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  padding: 0 ${PADDING}px;
  margin-bottom: 30px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ListItem = styled.li`
  width: 100%;
  padding: 12px ${PADDING}px;
  border-bottom: 1px solid #dbdbdb;
`;

const ListItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

function ContentCard({ title, children, ...props }) {
  return (
    <Container {...props}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}

ContentCard.List = List;
ContentCard.ListItem = ListItem;
ContentCard.ListItemRow = ListItemRow;

export default ContentCard;
