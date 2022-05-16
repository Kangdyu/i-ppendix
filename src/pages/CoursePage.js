import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MOCKUP_TODOS } from '../chrome/mockup/todos';
import PageContentContainer from '../components/PageContentContainer';
import TodoList from '../components/TodoList';
import useTodos from '../hooks/useTodos';

const TodoContainer = styled.section`
  display: flex;
  width: 100%;
`;

const StyledTodoList = styled(TodoList)`
  flex: 1;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

function CoursePage() {
  const { courseId } = useParams();
  // const { todos, isLoading } = useTodos({ courseId, mockup: true });

  // if (isLoading) return <main>Loading...</main>;
  const todos = MOCKUP_TODOS[courseId];

  return (
    <PageContentContainer title='Course'>
      <TodoContainer>
        <StyledTodoList title='수업' todos={todos.data.videos} />
        <StyledTodoList title='과제' todos={todos.data.assignments} />
      </TodoContainer>
    </PageContentContainer>
  );
}

export default CoursePage;
