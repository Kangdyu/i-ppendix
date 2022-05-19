import { formatDate, formatRemainTimeFromNow } from '../utils/date';
import ContentCard from './ContentCard';
import { StrongText, Text } from './Text';

function TodoList({ title, todos, ...props }) {
  return (
    <ContentCard title={title} {...props}>
      <ContentCard.List>
        {todos.length === 0 && (
          <StrongText>모든 할 일을 마쳤어요 😄</StrongText>
        )}
        {todos.map(todo => (
          <ContentCard.ListItem key={todo.id}>
            <ContentCard.ListItemRow>
              <StrongText>{todo.title}</StrongText>
              <StrongText>{formatRemainTimeFromNow(todo.due)}</StrongText>
            </ContentCard.ListItemRow>
            <ContentCard.ListItemRow>
              <Text type='weak' align='start'>
                {todo.courseName}
              </Text>
              <Text type='weak' align='end'>
                {formatDate(todo.due)}{' '}
              </Text>
            </ContentCard.ListItemRow>
          </ContentCard.ListItem>
        ))}
      </ContentCard.List>
    </ContentCard>
  );
}

export default TodoList;
