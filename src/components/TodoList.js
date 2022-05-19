import styled from 'styled-components';
import { formatDate, formatRemainTimeFromNow } from '../utils/date';
import ContentCard from './ContentCard';
import { StrongText, Text } from './Text';

const Anchor = styled.a`
  text-decoration: none;
`;

function TodoList({ title, todos, ...props }) {
  return (
    <ContentCard title={title} {...props}>
      <ContentCard.List>
        {todos.length === 0 && (
          <StrongText>모든 할 일을 마쳤어요 😄</StrongText>
        )}
        {todos.map(todo => (
          <ContentCard.ListItem key={todo.id}>
            <Anchor href={todo.url} target='_blank'>
              <ContentCard.ListItemRow>
                <StrongText>{todo.title}</StrongText>
                <StrongText>{formatRemainTimeFromNow(todo.due)}</StrongText>
              </ContentCard.ListItemRow>
              <ContentCard.ListItemRow>
                <Text type='weak' align='start'>
                  {todo.courseName}
                  {todo.time && ` | ${Math.ceil(todo.time / 60)}분`}
                </Text>
                <Text type='weak' align='end'>
                  마감기한 {formatDate(todo.due)}{' '}
                </Text>
              </ContentCard.ListItemRow>
            </Anchor>
          </ContentCard.ListItem>
        ))}
      </ContentCard.List>
    </ContentCard>
  );
}

export default TodoList;
