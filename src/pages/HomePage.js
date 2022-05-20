import { useQueries } from 'react-query';
import styled from 'styled-components';
import PageContentContainer from '../components/PageContentContainer';
import Section from '../components/Section';
import TodoList from '../components/TodoList';
import useCourses from '../hooks/useCourses';
import { BREAKPOINTS, MOCKUP } from '../utils/constants';
import { fetcher } from '../utils/fetcher';

const StyledTodoList = styled(TodoList)`
  flex: 1;
  &:not(:last-child) {
    margin-right: 20px;
  }

  @media (max-width: ${BREAKPOINTS.lg}px) {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
`;

function HomePage() {
  const { courses } = useCourses({ mockup: MOCKUP });
  const queries = useQueries(
    courses.data.map(course => {
      return {
        queryKey: ['todos', course.id],
        queryFn: () =>
          fetcher({ type: 'todos', courseId: course.id, mockup: MOCKUP }),
      };
    }),
    {
      enabled: !!courses,
    },
  );

  const isLoading = queries.some(query => query.isLoading);
  if (isLoading) return <main>Loading...</main>;

  const videoTodos = queries
    .map(query => query.data.data.videos)
    .reduce((prev, cur) => prev.concat(cur), [])
    .sort((a, b) => new Date(a.due) - new Date(b.due));

  const assignmentTodos = queries
    .map(query => query.data.data.assignments)
    .reduce((prev, cur) => prev.concat(cur), [])
    .sort((a, b) => new Date(a.due) - new Date(b.due));

  return (
    <PageContentContainer title='Home'>
      <Section>
        <StyledTodoList title='수업' todos={videoTodos} />
        <StyledTodoList title='과제' todos={assignmentTodos} />
      </Section>
    </PageContentContainer>
  );
}

export default HomePage;
