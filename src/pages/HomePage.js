import { useQueries } from 'react-query';
import styled from 'styled-components';
import NoticeList from '../components/NoticeList';
import PageContentContainer from '../components/PageContentContainer';
import Section from '../components/Section';
import TodoList from '../components/TodoList';
import useCourses from '../hooks/useCourses';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { BREAKPOINTS, LOCALSTORAGE_KEYS, MOCKUP } from '../utils/constants';
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

const StyledNoticeList = styled(NoticeList)`
  flex: 1;
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

  const [favoriteNotices, _] = useLocalStorageState(
    LOCALSTORAGE_KEYS.favoriteNotices,
    [],
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
      <Section>
        <StyledNoticeList title='즐겨찾는 공지사항' notices={favoriteNotices} />
      </Section>
    </PageContentContainer>
  );
}

export default HomePage;
