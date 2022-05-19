import styled from 'styled-components';
import { formatDate, formatRemainTimeFromNow } from '../utils/date';

const PADDING = 20;

const Container = styled.div`
  height: 500px;
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

const Text = styled.span`
  font-size: 14px;
  color: #555;
  text-align: ${props => props.align};
`;

const StrongText = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: black;
`;

function TodoList({ title, todos, ...props }) {
  return (
    <Container {...props}>
      <Title>{title}</Title>
      <List>
        {todos.map(todo => (
          <ListItem key={todo.id}>
            <ListItemRow>
              <StrongText>{todo.title}</StrongText>
              <StrongText>{formatRemainTimeFromNow(todo.due)}</StrongText>
            </ListItemRow>
            <ListItemRow>
              <Text align='start'>{todo.courseName}</Text>
              <Text align='end'>{formatDate(todo.due)} </Text>
            </ListItemRow>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TodoList;
