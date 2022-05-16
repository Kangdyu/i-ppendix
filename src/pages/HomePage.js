import { useState } from 'react';
import { useQueries } from 'react-query';
import styled from 'styled-components';
import PageContentContainer from '../components/PageContentContainer';
import TodoList from '../components/TodoList';
import useCourses from '../hooks/useCourses';
import { fetcher } from '../utils/fetcher';

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

function HomePage() {
  const { courses } = useCourses({ mockup: true });
  const queries = useQueries(
    courses.data.map(course => {
      return {
        queryKey: ['todos', course.id],
        queryFn: () =>
          fetcher({ type: 'todos', courseId: course.id, mockup: true }),
      };
    }),
    {
      enabled: !!courses,
    },
  );

  const isLoading = queries.some(query => query.isLoading);
  if (isLoading) return <main>Loading...</main>;

  const videoTodos = queries
    .map(query =>
      query.data.data.videos.sort((a, b) => new Date(a.due) - new Date(b.due)),
    )
    .reduce((prev, cur) => prev.concat(cur), []);

  const assignmentTodos = queries
    .map(query =>
      query.data.data.assignments.sort(
        (a, b) => new Date(a.due) - new Date(b.due),
      ),
    )
    .reduce((prev, cur) => prev.concat(cur), []);

  return (
    <PageContentContainer title='Home'>
      <TodoContainer>
        <StyledTodoList title='수업' todos={videoTodos} />
        <StyledTodoList title='과제' todos={assignmentTodos} />
      </TodoContainer>
    </PageContentContainer>
  );
}

export default HomePage;
