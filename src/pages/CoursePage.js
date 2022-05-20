import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoticeList from '../components/NoticeList';
import PageContentContainer from '../components/PageContentContainer';
import Section from '../components/Section';
import TodoList from '../components/TodoList';
import useNotices from '../hooks/useNotices';
import useTodos from '../hooks/useTodos';
import { BREAKPOINTS, MOCKUP } from '../utils/constants';

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

function CoursePage() {
  const { courseId } = useParams();
  const { todos, isLoading: isTodoLoading } = useTodos({
    courseId,
    mockup: MOCKUP,
  });
  const { notices, isLoading: isNoticesLoading } = useNotices({
    courseId,
    mockup: MOCKUP,
  });

  if (isTodoLoading || isNoticesLoading) return <main>Loading...</main>;

  return (
    <PageContentContainer title='Course'>
      <Section title='TODO'>
        <StyledTodoList title='수업' todos={todos.data.videos} />
        <StyledTodoList title='과제' todos={todos.data.assignments} />
      </Section>
      <Section title='Favorites'>
        <StyledNoticeList title='공지사항' notices={notices.data} />
      </Section>
    </PageContentContainer>
  );
}

export default CoursePage;
